-- Let administrators choose the membership-number groups eligible for each election.
-- The selection is enforced inside cast_election_vote, not only in the browser.

alter table public.elections
  add column if not exists eligible_membership_groups text[] not null
  default array['gm', 'fm']::text[];

update public.elections
set eligible_membership_groups = array['gm', 'fm']::text[]
where eligible_membership_groups is null
   or cardinality(eligible_membership_groups) = 0;

alter table public.elections
  drop constraint if exists elections_eligible_membership_groups_check;

alter table public.elections
  add constraint elections_eligible_membership_groups_check check (
    cardinality(eligible_membership_groups) > 0
    and eligible_membership_groups <@ array['gm', 'fm', 'adm', 'om', 'alm']::text[]
  );

create or replace function public.membership_group_from_values(
  p_registration_no text,
  p_membership_status text default null
)
returns text
language plpgsql
immutable
as $$
declare
  v_number text := regexp_replace(upper(coalesce(p_registration_no, '')), '[^A-Z0-9]', '', 'g');
  v_status text := lower(btrim(coalesce(p_membership_status, '')));
begin
  if v_number ~ 'ADM[0-9]{4}$' or v_number ~ '^AH[0-9]+' then return 'adm'; end if;
  if v_number ~ 'ALM[0-9]{4}$' then return 'alm'; end if;
  if v_number ~ 'FM[0-9]{4}$' then return 'fm'; end if;
  if v_number ~ 'OM[0-9]{4}$' then return 'om'; end if;
  if v_number ~ 'GM[0-9]{4}$' or v_number ~ '^L[0-9]+' then return 'gm'; end if;

  if v_status like '%ad hoc%' or v_status like '%adhoc%' then return 'adm'; end if;
  if v_status like '%associate%life%' then return 'alm'; end if;
  if v_status like '%founder%' then return 'fm'; end if;
  if v_status like '%overseas%' then return 'om'; end if;
  if v_status like '%life%' then return 'gm'; end if;
  return null;
end;
$$;

create or replace function public.member_membership_group(p_registration_no text)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select public.membership_group_from_values(md.registration_number, md.membership_status)
  from public.member_directory md
  where md.is_active = true
    and public.normalize_registration_no_value(md.registration_number)
      = public.normalize_registration_no_value(p_registration_no)
  limit 1;
$$;

grant execute on function public.member_membership_group(text) to anon, authenticated;

-- Voter registration now validates active membership, while the individual
-- election decides which recognized membership groups may vote.
create or replace function public.member_voting_eligibility(p_registration_no text)
returns table (
  ok boolean,
  code text,
  message text
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_registration_no text := public.normalize_registration_no_value(p_registration_no);
  v_membership_group text;
begin
  if v_registration_no is null then
    return query select false, 'REGISTRATION_REQUIRED', 'Registration number is required.';
    return;
  end if;

  select public.membership_group_from_values(md.registration_number, md.membership_status)
  into v_membership_group
  from public.member_directory md
  where md.is_active = true
    and public.normalize_registration_no_value(md.registration_number) = v_registration_no
  limit 1;

  if not found then
    return query select false, 'REGISTRATION_NOT_FOUND', 'This registration number is not in the active SGIHPBP member directory.';
    return;
  end if;

  if v_membership_group is null then
    return query select false, 'MEMBERSHIP_GROUP_UNKNOWN', 'This membership number does not match a recognized SGIHPBP membership group.';
    return;
  end if;

  return query select true, 'REGISTRATION_ALLOWED', 'Registration number can be used for voter access.';
end;
$$;

grant execute on function public.member_voting_eligibility(text) to anon, authenticated;

create or replace function public.member_election_voting_eligibility(
  p_registration_no text,
  p_election_slug text
)
returns table (
  ok boolean,
  code text,
  message text,
  membership_group text
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_base record;
  v_group text;
  v_groups text[];
begin
  select * into v_base from public.member_voting_eligibility(p_registration_no);
  v_group := public.member_membership_group(p_registration_no);

  if not coalesce(v_base.ok, false) then
    return query select false, v_base.code::text, v_base.message::text, v_group;
    return;
  end if;

  select e.eligible_membership_groups
  into v_groups
  from public.elections e
  where e.slug = lower(btrim(p_election_slug));

  if not found then
    return query select false, 'ELECTION_NOT_FOUND', 'This election could not be found.', v_group;
    return;
  end if;

  if not (v_group = any(v_groups)) then
    return query select false, 'MEMBERSHIP_GROUP_NOT_ELIGIBLE', 'Your membership group is not eligible to vote in this election.', v_group;
    return;
  end if;

  return query select true, 'REGISTRATION_ALLOWED', 'Your membership group is eligible for this election.', v_group;
end;
$$;

grant execute on function public.member_election_voting_eligibility(text, text) to anon, authenticated;

create or replace function public.count_election_eligible_profiles(p_election_slug text)
returns bigint
language sql
stable
security definer
set search_path = public
as $$
  select count(*)::bigint
  from public.profiles p
  where p.role = 'user'
    and p.is_active = true
    and exists (
      select 1
      from public.member_election_voting_eligibility(p.registration_no, p_election_slug) eligibility
      where eligibility.ok = true
    );
$$;

grant execute on function public.count_election_eligible_profiles(text) to authenticated;

create or replace function public.cast_election_vote(
  p_election_slug text,
  p_candidate_slug text
)
returns table (
  ok boolean,
  code text,
  vote_id uuid,
  election_id uuid,
  candidate_id uuid,
  voted_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_profile public.profiles%rowtype;
  v_election public.elections%rowtype;
  v_candidate public.election_candidates%rowtype;
  v_vote public.election_votes%rowtype;
  v_eligibility record;
  v_position_key text;
  v_max_votes integer;
  v_position_vote_count integer;
begin
  if v_user_id is null then
    return query select false, 'AUTH_REQUIRED', null::uuid, null::uuid, null::uuid, null::timestamptz;
    return;
  end if;

  select * into v_profile
  from public.profiles
  where id = v_user_id and role = 'user' and is_active = true;

  if not found then
    return query select false, 'PROFILE_NOT_ALLOWED', null::uuid, null::uuid, null::uuid, null::timestamptz;
    return;
  end if;

  if nullif(btrim(coalesce(v_profile.full_name, '')), '') is null
    or nullif(btrim(coalesce(v_profile.registration_no, '')), '') is null
    or nullif(btrim(coalesce(v_profile.photo_path, '')), '') is null then
    return query select false, 'PROFILE_INCOMPLETE', null::uuid, null::uuid, null::uuid, null::timestamptz;
    return;
  end if;

  select * into v_election
  from public.elections
  where slug = lower(btrim(p_election_slug));

  if not found then
    return query select false, 'ELECTION_NOT_FOUND', null::uuid, null::uuid, null::uuid, null::timestamptz;
    return;
  end if;

  select * into v_eligibility
  from public.member_election_voting_eligibility(v_profile.registration_no, v_election.slug);

  if not coalesce(v_eligibility.ok, false) then
    return query select false, v_eligibility.code::text, null::uuid, v_election.id, null::uuid, null::timestamptz;
    return;
  end if;

  if v_election.status not in ('scheduled', 'active') then
    return query select false, 'ELECTION_NOT_ACTIVE', null::uuid, v_election.id, null::uuid, null::timestamptz;
    return;
  end if;

  if v_election.status = 'scheduled' and v_election.starts_at is null then
    return query select false, 'ELECTION_NOT_STARTED', null::uuid, v_election.id, null::uuid, null::timestamptz;
    return;
  end if;

  if v_election.starts_at is not null and now() < v_election.starts_at then
    return query select false, 'ELECTION_NOT_STARTED', null::uuid, v_election.id, null::uuid, null::timestamptz;
    return;
  end if;

  if v_election.ends_at is not null and now() > v_election.ends_at then
    return query select false, 'ELECTION_ENDED', null::uuid, v_election.id, null::uuid, null::timestamptz;
    return;
  end if;

  select * into v_candidate
  from public.election_candidates ec
  where ec.election_id = v_election.id
    and ec.slug = lower(btrim(p_candidate_slug))
    and ec.is_active = true;

  if not found then
    return query select false, 'CANDIDATE_NOT_FOUND', null::uuid, v_election.id, null::uuid, null::timestamptz;
    return;
  end if;

  v_position_key := public.election_position_key(v_candidate.position);

  select coalesce(max_votes, 1) into v_max_votes
  from public.election_vote_limits
  where election_vote_limits.election_id = v_election.id
    and election_vote_limits.position_key = v_position_key;

  v_max_votes := coalesce(v_max_votes, 1);

  select * into v_vote
  from public.election_votes ev
  where ev.election_id = v_election.id
    and ev.voter_id = v_user_id
    and ev.candidate_id = v_candidate.id;

  if found then
    return query select false, 'ALREADY_VOTED', v_vote.id, v_vote.election_id, v_vote.candidate_id, v_vote.created_at;
    return;
  end if;

  select count(*) into v_position_vote_count
  from public.election_votes ev
  where ev.election_id = v_election.id
    and ev.voter_id = v_user_id
    and coalesce(ev.position_key, public.election_position_key((select ec.position from public.election_candidates ec where ec.id = ev.candidate_id))) = v_position_key;

  if v_position_vote_count >= v_max_votes then
    return query select false, 'POSITION_VOTE_LIMIT_REACHED', null::uuid, v_election.id, v_candidate.id, null::timestamptz;
    return;
  end if;

  insert into public.election_votes (
    election_id, candidate_id, voter_id, voter_registration_no, position_key
  ) values (
    v_election.id, v_candidate.id, v_user_id, v_profile.registration_no, v_position_key
  ) returning * into v_vote;

  return query select true, 'VOTE_RECORDED', v_vote.id, v_vote.election_id, v_vote.candidate_id, v_vote.created_at;
exception
  when unique_violation then
    select * into v_vote
    from public.election_votes ev
    where ev.election_id = v_election.id
      and ev.voter_id = v_user_id
      and ev.candidate_id = v_candidate.id
    limit 1;

    return query select false, 'ALREADY_VOTED', v_vote.id, v_vote.election_id, v_vote.candidate_id, v_vote.created_at;
end;
$$;

revoke all on function public.cast_election_vote(text, text) from public;
grant execute on function public.cast_election_vote(text, text) to authenticated;
