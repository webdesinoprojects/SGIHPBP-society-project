-- Enforce the requested maximum of 20 advisors in each advisor group.

create or replace function public.enforce_governing_body_advisor_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  if new.section in ('national_advisor', 'international_advisor') then
    select count(*)
    into v_count
    from public.governing_body_members
    where section = new.section
      and id is distinct from new.id;

    if v_count >= 20 then
      raise exception 'A maximum of 20 advisors is allowed in each advisor group.';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists governing_body_advisor_limit on public.governing_body_members;
create trigger governing_body_advisor_limit
before insert or update of section
on public.governing_body_members
for each row execute function public.enforce_governing_body_advisor_limit();
