-- Continue membership serials across years while stamping new approvals with the current year.

update public.membership_plan_options
set label = 'Overseas Membership (3 years)',
    description = 'Three-year overseas membership.',
    amount = 200,
    currency = 'USD',
    amount_label = '200 USD',
    duration_label = 'Per 3 Years',
    number_prefix = 'OM',
    bill_prefix = 'OM',
    validity_years = 3,
    is_active = true,
    sort_order = 40
where slug = 'overseas';

create or replace function public.format_sgihpbp_membership_number(
  p_prefix text,
  p_sequence integer,
  p_year integer
)
returns text
language sql
immutable
as $$
  select case
    when lower(p_prefix) = 'adm'
      then 'SGIHPBP/' || lpad(p_sequence::text, 5, '0') || 'AdM/' || p_year::text
    when lower(p_prefix) = 'om'
      then 'SGIHPBP/' || lpad(p_sequence::text, 3, '0') || 'OM/' || p_year::text
    else 'SGIHPBP/' || lpad(p_sequence::text, 5, '0') || '/' || p_prefix || '/' || p_year::text
  end;
$$;

create or replace function public.max_sgihpbp_membership_sequence(
  p_prefix text,
  p_year integer
)
returns integer
language plpgsql
stable
as $$
declare
  v_pattern text;
  v_max integer;
begin
  -- p_year remains in the signature for compatibility, but serials intentionally continue across years.
  if lower(p_prefix) = 'adm' then
    v_pattern := '^SGIHPBP/([0-9]+)AdM/[0-9]{4}$';
  elsif lower(p_prefix) = 'om' then
    v_pattern := '^SGIHPBP/([0-9]+)OM/[0-9]{4}$';
  else
    v_pattern := '^SGIHPBP/([0-9]+)/' || p_prefix || '/[0-9]{4}$';
  end if;

  select coalesce(max(sequence_value), 0)
  into v_max
  from (
    select substring(registration_number from v_pattern)::integer as sequence_value
    from public.member_directory
    where registration_number ~ v_pattern
    union all
    select substring(membership_number from v_pattern)::integer
    from public.membership_applications
    where membership_number ~ v_pattern
  ) existing;

  return v_max;
end;
$$;

create or replace function public.approve_membership_application(
  p_application_id uuid,
  p_membership_number text default null,
  p_bill_number text default null
)
returns public.membership_applications
language plpgsql
security definer
set search_path = public
as $$
declare
  v_application public.membership_applications;
  v_member_prefix text;
  v_bill_prefix text;
  v_counter_key text;
  v_existing_max integer;
  v_next integer;
  v_year integer := extract(year from current_date)::integer;
  v_membership_number text;
  v_bill_number text;
  v_attempts integer := 0;
begin
  if not public.is_admin() then
    raise exception 'Only admins can approve membership applications.';
  end if;

  select *
  into v_application
  from public.membership_applications
  where id = p_application_id
  for update;

  if not found then
    raise exception 'Membership application not found.';
  end if;

  v_membership_number := nullif(trim(p_membership_number), '');

  if v_membership_number is null then
    v_member_prefix := public.membership_prefix_for(
      v_application.membership_type,
      v_application.amount_paid,
      v_application.currency,
      current_date
    );
    v_counter_key := 'member:' || v_member_prefix;
    v_existing_max := public.max_sgihpbp_membership_sequence(v_member_prefix, v_year);

    insert into public.membership_counters(prefix, last_value, updated_at)
    values (v_counter_key, v_existing_max, now())
    on conflict (prefix) do update
      set last_value = greatest(public.membership_counters.last_value, excluded.last_value),
          updated_at = now();

    loop
      update public.membership_counters
      set last_value = last_value + 1,
          updated_at = now()
      where prefix = v_counter_key
      returning last_value into v_next;

      v_membership_number := public.format_sgihpbp_membership_number(v_member_prefix, v_next, v_year);
      exit when public.membership_number_available(v_membership_number, p_application_id);

      v_attempts := v_attempts + 1;
      if v_attempts > 1000 then
        raise exception 'Unable to find an available SGIHPBP membership number.';
      end if;
    end loop;
  elsif not public.membership_number_available(v_membership_number, p_application_id) then
    raise exception 'Membership number % already exists in the member directory.', v_membership_number;
  end if;

  v_bill_number := nullif(trim(p_bill_number), '');
  if v_bill_number is null then
    v_bill_prefix := public.membership_bill_prefix_for(v_application.membership_type);
    v_counter_key := 'bill:' || v_bill_prefix || ':' || v_year::text;
    v_existing_max := public.max_sgihpbp_bill_sequence(v_bill_prefix, v_year);

    insert into public.membership_counters(prefix, last_value, updated_at)
    values (v_counter_key, v_existing_max, now())
    on conflict (prefix) do update
      set last_value = greatest(public.membership_counters.last_value, excluded.last_value),
          updated_at = now();

    update public.membership_counters
    set last_value = last_value + 1,
        updated_at = now()
    where prefix = v_counter_key
    returning last_value into v_next;

    v_bill_number := lpad(v_next::text, 5, '0') || '/' || v_bill_prefix || '/' || v_year::text;
  end if;

  update public.membership_applications
  set status = 'approved',
      membership_number = v_membership_number,
      bill_number = v_bill_number,
      approved_at = coalesce(approved_at, now()),
      approved_by = coalesce(approved_by, auth.uid()),
      last_email_status = coalesce(last_email_status, 'not_sent')
  where id = p_application_id
  returning * into v_application;

  return v_application;
end;
$$;

grant execute on function public.approve_membership_application(uuid, text, text) to authenticated;
