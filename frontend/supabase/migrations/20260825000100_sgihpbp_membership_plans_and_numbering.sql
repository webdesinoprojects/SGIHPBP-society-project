-- Align the public membership plans and generated identifiers with SGIHPBP records.

update public.membership_portal_settings
set payment_markdown = '## Bank Transfer

- **Account Name:** Society of Gastrointestinal & Hepato-Pancreatobiliary Pathologist''s
- **Bank:** Bank of Baroda
- **Account No:** 26020100024967
- **IFSC Code:** BARB0RAMDEL (5th character is zero)
- **Branch:** Dr. RML Hospital, New Delhi',
    promo_enabled = false;

alter table public.membership_plan_options
  add column if not exists bill_prefix text;

alter table public.membership_plan_options
  drop constraint if exists membership_plan_options_number_prefix_check,
  add constraint membership_plan_options_number_prefix_check
    check (number_prefix is null or number_prefix ~ '^[A-Za-z0-9]{1,8}$');

alter table public.membership_plan_options
  drop constraint if exists membership_plan_options_bill_prefix_check,
  add constraint membership_plan_options_bill_prefix_check
    check (bill_prefix is null or bill_prefix ~ '^[A-Za-z0-9]{1,8}$');

update public.membership_plan_options
set label = 'Life Membership',
    description = 'One-time payment for lifetime membership.',
    amount = 10000,
    currency = 'INR',
    amount_label = '10,000 INR',
    duration_label = 'One-Time Payment',
    number_prefix = 'GM',
    bill_prefix = 'LM',
    validity_years = null,
    is_active = true,
    sort_order = 10
where slug = 'life';

update public.membership_plan_options
set label = 'Ad Hoc Membership (For 3 years)',
    description = 'Valid for 3 years and renewable on reapplication and payment.',
    amount = 2500,
    currency = 'INR',
    amount_label = '2,500 INR',
    duration_label = 'Per 3 Years',
    number_prefix = 'AdM',
    bill_prefix = 'AH',
    validity_years = 3,
    is_active = true,
    sort_order = 20
where slug = 'ad_hoc';

insert into public.membership_plan_options (
  slug, label, description, amount, currency, amount_label, duration_label,
  number_prefix, bill_prefix, validity_years, is_active, sort_order
)
values (
  'associate_life',
  'Associate Life Membership',
  'One-time payment for associate life membership.',
  10000,
  'INR',
  '10,000 INR',
  'One-Time Payment',
  'ALM',
  'ALM',
  null,
  true,
  30
)
on conflict (slug) do update set
  label = excluded.label,
  description = excluded.description,
  amount = excluded.amount,
  currency = excluded.currency,
  amount_label = excluded.amount_label,
  duration_label = excluded.duration_label,
  number_prefix = excluded.number_prefix,
  bill_prefix = excluded.bill_prefix,
  validity_years = excluded.validity_years,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order;

update public.membership_plan_options
set is_active = false
where slug = 'overseas';

update public.membership_interest_categories
set is_active = false;

insert into public.membership_interest_categories (slug, label, is_active, sort_order)
values
  ('gi-hpb-pathologist', 'I am a gastrointestinal & hepatopancreatobiliary pathologist', true, 10),
  ('pg-student-interested', 'I am a PG student interested in this field of pathology', true, 20),
  ('gi-hpb-fellow', 'I am a Fellow/ PDCC in gastrointestinal & hepatopancreatobiliary pathology', true, 30),
  ('gi-clinician', 'I am a clinical gastroenterologist/ gastrointestinal surgeon/ radiologist', true, 40)
on conflict (slug) do update set
  label = excluded.label,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order;

update public.membership_plan_options
set number_prefix = 'FM',
    bill_prefix = 'FM'
where slug = 'founder' or lower(label) like 'founder membership%';

create or replace function public.membership_prefix_for(
  p_membership_type text,
  p_amount numeric,
  p_currency text,
  p_effective_date date default current_date
)
returns text
language plpgsql
stable
as $$
declare
  v_prefix text;
begin
  select nullif(trim(number_prefix), '')
  into v_prefix
  from public.membership_plan_options
  where slug = lower(trim(p_membership_type));

  if v_prefix is not null then
    return v_prefix;
  end if;

  return case lower(trim(p_membership_type))
    when 'founder' then 'FM'
    when 'ad_hoc' then 'AdM'
    when 'associate_life' then 'ALM'
    else 'GM'
  end;
end;
$$;

create or replace function public.membership_bill_prefix_for(p_membership_type text)
returns text
language plpgsql
stable
as $$
declare
  v_prefix text;
begin
  select nullif(trim(bill_prefix), '')
  into v_prefix
  from public.membership_plan_options
  where slug = lower(trim(p_membership_type));

  if v_prefix is not null then
    return v_prefix;
  end if;

  return case lower(trim(p_membership_type))
    when 'founder' then 'FM'
    when 'ad_hoc' then 'AH'
    when 'associate_life' then 'ALM'
    else 'LM'
  end;
end;
$$;

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
  if lower(p_prefix) = 'adm' then
    v_pattern := '^SGIHPBP/([0-9]+)AdM/' || p_year::text || '$';
  else
    v_pattern := '^SGIHPBP/([0-9]+)/' || p_prefix || '/' || p_year::text || '$';
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

create or replace function public.max_sgihpbp_bill_sequence(
  p_prefix text,
  p_year integer
)
returns integer
language sql
stable
as $$
  select coalesce(max(substring(bill_number from ('^([0-9]+)/' || p_prefix || '/' || p_year::text || '$'))::integer), 0)
  from public.membership_applications
  where bill_number ~ ('^[0-9]+/' || p_prefix || '/' || p_year::text || '$');
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
    v_counter_key := 'member:' || v_member_prefix || ':' || v_year::text;
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
