param(
  [Parameter(Mandatory = $true)]
  [string]$CsvPath,

  [Parameter(Mandatory = $true)]
  [string]$OutputPath
)

$ErrorActionPreference = 'Stop'

function Sql-Text {
  param([AllowNull()][string]$Value)
  if ([string]::IsNullOrWhiteSpace($Value)) {
    return 'null'
  }

  $clean = $Value.Replace(([string][char]0), '').Trim().Replace("'", "''")
  return "'$clean'"
}

function Stable-Uuid {
  param([string]$InputValue)
  $md5 = [System.Security.Cryptography.MD5]::Create()
  try {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($InputValue)
    $hex = ([System.BitConverter]::ToString($md5.ComputeHash($bytes))).Replace('-', '').ToLowerInvariant()
    return '{0}-{1}-{2}-{3}-{4}' -f $hex.Substring(0, 8), $hex.Substring(8, 4), $hex.Substring(12, 4), $hex.Substring(16, 4), $hex.Substring(20, 12)
  } finally {
    $md5.Dispose()
  }
}

function Valid-HttpUrl {
  param([AllowNull()][string]$Value)
  if ([string]::IsNullOrWhiteSpace($Value)) {
    return $null
  }

  $uri = $null
  if ([Uri]::TryCreate($Value.Trim(), [UriKind]::Absolute, [ref]$uri) -and $uri.Scheme -in @('http', 'https')) {
    return $uri.AbsoluteUri
  }
  return $null
}

function Membership-Plan {
  param([string]$Category)
  $normalized = $Category.Trim().ToLowerInvariant()
  if ($normalized -like 'founder*') {
    return @{ Slug = 'founder'; Label = 'Founder Membership'; Amount = 10000; Currency = 'INR'; AmountLabel = '10,000 INR' }
  }
  if ($normalized -like 'associate*') {
    return @{ Slug = 'associate_life'; Label = 'Associate Life Membership'; Amount = 10000; Currency = 'INR'; AmountLabel = '10,000 INR' }
  }
  if ($normalized -like 'ad hoc*') {
    return @{ Slug = 'ad_hoc'; Label = 'Ad Hoc Membership (For 3 years)'; Amount = 2500; Currency = 'INR'; AmountLabel = '2,500 INR' }
  }
  return @{ Slug = 'life'; Label = 'Life Membership'; Amount = 10000; Currency = 'INR'; AmountLabel = '10,000 INR' }
}

$rows = @(Import-Csv -LiteralPath $CsvPath)
if ($rows.Count -eq 0) {
  throw 'The CSV has no membership rows.'
}

$requiredColumns = @(
  'Serial No', 'Name', 'Membership ID', 'Address', 'Institute', 'Email', 'Mobile',
  'Transaction ID', 'Category', 'Qualification', 'Practicing', 'Student Status',
  'Interest', 'Photo URL', 'Status', 'Receipt', 'Certificate'
)
$availableColumns = @($rows[0].PSObject.Properties.Name)
$missingColumns = @($requiredColumns | Where-Object { $_ -notin $availableColumns })
if ($missingColumns.Count -gt 0) {
  throw "CSV is missing required columns: $($missingColumns -join ', ')"
}

$authorized = @($rows | Where-Object { $_.Status.Trim() -eq 'Authorized' })
$pending = @($rows | Where-Object { $_.Status.Trim() -eq 'Pending' })
$authorizedIds = @($authorized | ForEach-Object { $_.'Membership ID'.Trim() })

if ($authorized.Count -ne 258 -or $pending.Count -ne 5) {
  throw "Expected 258 Authorized and 5 Pending rows; found $($authorized.Count) Authorized and $($pending.Count) Pending."
}
if (@($authorizedIds | Where-Object { [string]::IsNullOrWhiteSpace($_) }).Count -gt 0) {
  throw 'An Authorized row is missing its Membership ID.'
}
if (@($authorizedIds | Group-Object | Where-Object Count -gt 1).Count -gt 0) {
  throw 'The CSV contains duplicate Membership IDs.'
}

$valueRows = foreach ($row in $rows) {
  $serial = [int]$row.'Serial No'
  $email = $row.Email.Trim().ToLowerInvariant()
  $plan = Membership-Plan $row.Category
  $isApproved = $row.Status.Trim() -eq 'Authorized'
  $membershipNumber = if ($isApproved) { Sql-Text $row.'Membership ID' } else { 'null' }
  $status = if ($isApproved) { 'approved' } else { 'submitted' }
  $approvedAt = if ($isApproved) { "timestamptz '2025-01-01 00:00:00+00' + interval '$serial seconds'" } else { 'null' }
  $photoUrl = Valid-HttpUrl $row.'Photo URL'
  $receiptUrl = Valid-HttpUrl $row.Receipt
  $certificateUrl = Valid-HttpUrl $row.Certificate
  $photoPath = if ($photoUrl) { Sql-Text $photoUrl } else { Sql-Text "legacy-import/no-photo/$serial" }
  $receiptPath = if ($receiptUrl) { Sql-Text $receiptUrl } else { 'null' }
  $certificatePath = if ($certificateUrl) { Sql-Text $certificateUrl } else { 'null' }
  $qualification = if ([string]::IsNullOrWhiteSpace($row.Qualification)) { 'Not provided' } else { $row.Qualification }
  $institution = if ([string]::IsNullOrWhiteSpace($row.Institute)) { 'Not provided' } else { $row.Institute }
  $address = if ([string]::IsNullOrWhiteSpace($row.Address)) { 'Not provided' } else { $row.Address }
  $phone = if ([string]::IsNullOrWhiteSpace($row.Mobile)) { 'Not provided' } else { $row.Mobile.Trim() }
  $practicing = $row.Practicing.Trim() -eq 'Yes' -or $row.Practicing.Trim() -eq 'I am a practicing pathologist'
  $id = Stable-Uuid "sgihpbp-membership:${serial}:$email"
  $createdAt = "timestamptz '2025-01-01 00:00:00+00' + interval '$serial seconds'"
  $note = "Imported from SGIHPBP - MembershipForm.csv (source row $serial)."

  @"
(
  '$id'::uuid,
  $(Sql-Text $row.Name),
  $(Sql-Text $institution),
  $(Sql-Text $qualification),
  $($practicing.ToString().ToLowerInvariant()),
  $(Sql-Text $row.'Student Status'),
  $(Sql-Text $address),
  $(Sql-Text $email),
  $(Sql-Text $phone),
  '$($plan.Slug)',
  $(Sql-Text $plan.Label),
  $($plan.Amount),
  '$($plan.Currency)',
  $(Sql-Text $plan.AmountLabel),
  $(Sql-Text $row.'Transaction ID'),
  $(Sql-Text $row.Interest),
  $photoPath,
  null,
  null,
  $(Sql-Text "legacy-import/no-payment-proof/$serial"),
  null,
  null,
  '$status',
  $membershipNumber,
  null,
  $(Sql-Text $note),
  $approvedAt,
  null,
  $receiptPath,
  $(if ($receiptUrl) { Sql-Text "receipt-$serial.pdf" } else { 'null' }),
  $(if ($receiptUrl) { "'application/pdf'" } else { 'null' }),
  $certificatePath,
  $(if ($certificateUrl) { Sql-Text "certificate-$serial.pdf" } else { 'null' }),
  $(if ($certificateUrl) { "'application/pdf'" } else { 'null' }),
  'not_sent',
  $createdAt,
  now()
)
"@
}

$values = $valueRows -join ",`r`n"
$sql = @"
-- Import the verified SGIHPBP MembershipForm CSV snapshot.
-- Expected source: 263 rows (258 Authorized, 5 Pending).
-- Idempotent: deterministic application IDs make this safe to re-run.

-- Recover safely if an earlier interrupted import left this trigger disabled.
alter table public.membership_applications
  enable trigger membership_applications_apply_plan_option;

begin;

insert into public.membership_plan_options (
  slug, label, description, amount, currency, amount_label, duration_label,
  number_prefix, bill_prefix, validity_years, is_active, sort_order
)
values (
  'founder', 'Founder Membership', 'Historical founder membership.',
  10000, 'INR', '10,000 INR', 'One-Time Payment',
  'FM', 'FM', null, true, 5
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
  is_active = true,
  sort_order = excluded.sort_order;

insert into public.membership_applications (
  id,
  applicant_name,
  institution,
  qualification,
  practicing_pathologist,
  student_status,
  address,
  email,
  phone,
  membership_type,
  membership_type_label,
  amount_paid,
  currency,
  amount_label,
  transaction_details,
  interest_category,
  photo_path,
  photo_mime_type,
  photo_size,
  payment_proof_path,
  payment_proof_mime_type,
  payment_proof_size,
  status,
  membership_number,
  bill_number,
  admin_notes,
  approved_at,
  approved_by,
  receipt_path,
  receipt_file_name,
  receipt_mime_type,
  certificate_path,
  certificate_file_name,
  certificate_mime_type,
  last_email_status,
  created_at,
  updated_at
)
values
$values
on conflict (id) do update set
  applicant_name = excluded.applicant_name,
  institution = excluded.institution,
  qualification = excluded.qualification,
  practicing_pathologist = excluded.practicing_pathologist,
  student_status = excluded.student_status,
  address = excluded.address,
  email = excluded.email,
  phone = excluded.phone,
  membership_type = excluded.membership_type,
  membership_type_label = excluded.membership_type_label,
  amount_paid = excluded.amount_paid,
  currency = excluded.currency,
  amount_label = excluded.amount_label,
  transaction_details = excluded.transaction_details,
  interest_category = excluded.interest_category,
  photo_path = excluded.photo_path,
  status = excluded.status,
  membership_number = excluded.membership_number,
  admin_notes = excluded.admin_notes,
  approved_at = excluded.approved_at,
  receipt_path = excluded.receipt_path,
  receipt_file_name = excluded.receipt_file_name,
  receipt_mime_type = excluded.receipt_mime_type,
  certificate_path = excluded.certificate_path,
  certificate_file_name = excluded.certificate_file_name,
  certificate_mime_type = excluded.certificate_mime_type,
  updated_at = now();

update public.membership_plan_options
set is_active = false
where slug = 'founder';

update public.member_directory directory
set source = 'sheet_import',
    source_row = substring(applications.admin_notes from 'source row ([0-9]+)')::integer,
    valid_from = coalesce(directory.valid_from, applications.approved_at::date),
    valid_until = case
      when applications.membership_type = 'ad_hoc'
        then (applications.approved_at::date + interval '3 years' - interval '1 day')::date
      else null
    end,
    updated_at = now()
from public.membership_applications applications
where directory.source_application_id = applications.id
  and applications.admin_notes like 'Imported from SGIHPBP - MembershipForm.csv%';

do `$`$
declare
  v_imported_applications integer;
  v_imported_members integer;
begin
  select count(*)
  into v_imported_applications
  from public.membership_applications
  where admin_notes like 'Imported from SGIHPBP - MembershipForm.csv%';

  select count(*)
  into v_imported_members
  from public.member_directory
  where source = 'sheet_import';

  if v_imported_applications <> 263 then
    raise exception 'Expected 263 imported applications, found %.', v_imported_applications;
  end if;

  if v_imported_members < 258 then
    raise exception 'Expected at least 258 imported members, found %.', v_imported_members;
  end if;
end
`$`$;

commit;
"@

$target = [IO.Path]::GetFullPath($OutputPath)
$parent = [IO.Path]::GetDirectoryName($target)
if ($parent) {
  [IO.Directory]::CreateDirectory($parent) | Out-Null
}
[IO.File]::WriteAllText($target, $sql, [Text.UTF8Encoding]::new($false))

[pscustomobject]@{
  OutputPath = $target
  Rows = $rows.Count
  Authorized = $authorized.Count
  Pending = $pending.Count
  Bytes = (Get-Item -LiteralPath $target).Length
}
