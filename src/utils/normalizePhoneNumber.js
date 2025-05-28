// src/utils/normalizePhoneNumber.js
export function normalizePhoneNumber(number) {
  if (!number) return number;
  const trimmed = number.trim();

  if (trimmed.startsWith('+')) return trimmed;
  if (trimmed.length === 10) return `+91${trimmed}`;
  return trimmed;
}
