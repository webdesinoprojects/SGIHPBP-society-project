-- Keep the member directory consistent when an approved application is corrected.

create or replace function public.cleanup_member_directory_for_application_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.status = 'approved'
     and (
       new.status <> 'approved'
       or old.membership_number is distinct from new.membership_number
     ) then
    delete from public.member_directory
    where source_application_id = old.id;
  end if;

  return new;
end;
$$;

drop trigger if exists membership_application_cleanup_member_directory on public.membership_applications;
create trigger membership_application_cleanup_member_directory
before update of status, membership_number
on public.membership_applications
for each row execute function public.cleanup_member_directory_for_application_change();

-- Remove any historical duplicate linked rows before enforcing one directory row per application.
with ranked as (
  select
    id,
    row_number() over (
      partition by source_application_id
      order by updated_at desc, created_at desc, id desc
    ) as row_rank
  from public.member_directory
  where source_application_id is not null
)
delete from public.member_directory directory
using ranked
where directory.id = ranked.id
  and ranked.row_rank > 1;

create unique index if not exists member_directory_source_application_unique_idx
  on public.member_directory (source_application_id)
  where source_application_id is not null;
