export function normalizePhoneNumber(value) {
  const trimmed = String(value || '').trim();
  const digits = trimmed.replace(/\D/g, '');
  return trimmed.startsWith('+') ? `+${digits}` : digits;
}

export function getPhoneValidationError(value) {
  const phone = String(value || '').trim();
  if (!phone) return 'Phone number is required';
  if (!/^\+?[0-9\s().-]+$/.test(phone)) {
    return 'Enter a valid phone number using digits and an optional country code';
  }

  const digitCount = phone.replace(/\D/g, '').length;
  if (digitCount < 7 || digitCount > 15) {
    return 'Phone number must contain between 7 and 15 digits';
  }

  return null;
}
