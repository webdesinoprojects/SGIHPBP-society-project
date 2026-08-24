-- Admin-managed news and intimations displayed beside the mission on the homepage.

create table if not exists public.home_notices (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 1 and 180),
  message text not null check (char_length(trim(message)) > 0),
  notice_type text not null default 'Notice',
  published_on date not null default current_date,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists home_notices_public_idx
  on public.home_notices (is_published, sort_order, published_on desc, created_at desc);

drop trigger if exists home_notices_set_updated_at on public.home_notices;
create trigger home_notices_set_updated_at
before update on public.home_notices
for each row execute function public.set_updated_at();

alter table public.home_notices enable row level security;

drop policy if exists "Anyone reads published home notices" on public.home_notices;
create policy "Anyone reads published home notices"
on public.home_notices for select
to anon, authenticated
using (is_published or public.is_admin());

drop policy if exists "Admins manage home notices" on public.home_notices;
create policy "Admins manage home notices"
on public.home_notices for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

grant select on public.home_notices to anon, authenticated;
grant insert, update, delete on public.home_notices to authenticated;

do $$
begin
  alter publication supabase_realtime add table public.home_notices;
exception when duplicate_object then null;
end $$;
