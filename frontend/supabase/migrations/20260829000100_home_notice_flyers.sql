-- Optional flyer attachments for homepage notices.

alter table public.home_notices
  add column if not exists flyer_url text,
  add column if not exists flyer_path text,
  add column if not exists flyer_type text,
  add column if not exists flyer_provider text,
  add column if not exists flyer_file_id text;

alter table public.home_notices
  drop constraint if exists home_notices_flyer_url_protocol;

alter table public.home_notices
  add constraint home_notices_flyer_url_protocol
  check (flyer_url is null or flyer_url ~* '^https?://');

-- Files are uploaded to ImageKit. Supabase stores only their delivery metadata.
