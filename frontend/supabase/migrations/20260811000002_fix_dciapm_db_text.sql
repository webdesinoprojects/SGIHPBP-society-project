-- Fix remaining DC-IAPM texts in database

-- 1. Fix member directory settings
UPDATE public.member_directory_notice
SET message = REPLACE(message, 'DC-IAPM', 'SGIHPBP')
WHERE message LIKE '%DC-IAPM%';

ALTER TABLE public.member_directory_notice ALTER COLUMN message SET DEFAULT 'If your email or phone number is missing or incorrect in the member directory, please contact SGIHPBP so the admin team can update your record.';

-- 2. Fix the voting eligibility function message
CREATE OR REPLACE FUNCTION public.member_voting_eligibility(p_registration_no text)
RETURNS TABLE (
  ok boolean,
  code text,
  message text
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_registration_no text := public.normalize_registration_no_value(p_registration_no);
  v_directory_number text;
  v_membership_status text;
BEGIN
  IF v_registration_no IS NULL THEN
    RETURN QUERY SELECT
      false,
      'REGISTRATION_REQUIRED',
      'Registration number is required.';
    RETURN;
  END IF;

  SELECT md.registration_number, coalesce(md.membership_status, '')
  INTO v_directory_number, v_membership_status
  FROM public.member_directory md
  WHERE md.is_active = true
    AND public.normalize_registration_no_value(md.registration_number) = v_registration_no
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN QUERY SELECT
      false,
      'REGISTRATION_NOT_FOUND',
      'This registration number is not in the active member directory.';
    RETURN;
  END IF;

  IF v_registration_no LIKE 'AH%'
    OR lower(v_membership_status) LIKE '%ad hoc%'
    OR lower(v_membership_status) LIKE '%adhoc%' THEN
    RETURN QUERY SELECT
      false,
      'AD_HOC_NOT_ELIGIBLE',
      'Ad Hoc members are not eligible to vote in SGIHPBP elections. Please contact the administrator if this is incorrect.';
    RETURN;
  END IF;

  RETURN QUERY SELECT
    true,
    'REGISTRATION_ALLOWED',
    'Registration number can be used for voter access.';
END;
$$;
