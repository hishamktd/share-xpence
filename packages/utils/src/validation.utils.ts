/**
 * Validation utilities
 */

import { VALIDATION } from '@shared/config';

/**
 * Validate email format
 * @param email - Email to validate
 * @returns True if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns True if password meets requirements
 */
export function isValidPassword(password: string): boolean {
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return false;
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasUppercase && hasLowercase && hasNumber;
}

/**
 * Get password strength score (0-4)
 * @param password - Password to check
 * @returns Strength score
 */
export function getPasswordStrength(password: string): number {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  return Math.min(strength, 4);
}

/**
 * Validate amount (must be positive number)
 * @param amount - Amount to validate
 * @returns True if valid
 */
export function isValidAmount(amount: number): boolean {
  return !isNaN(amount) && amount > 0 && Number.isFinite(amount);
}

/**
 * Validate title length
 * @param title - Title to validate
 * @returns True if valid
 */
export function isValidTitle(title: string): boolean {
  return title.trim().length > 0 && title.length <= VALIDATION.TITLE_MAX_LENGTH;
}

/**
 * Validate notes length
 * @param notes - Notes to validate
 * @returns True if valid
 */
export function isValidNotes(notes: string): boolean {
  return notes.length <= VALIDATION.NOTES_MAX_LENGTH;
}

/**
 * Sanitize string input
 * @param input - String to sanitize
 * @returns Sanitized string
 */
export function sanitizeString(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

/**
 * Validate UUID format
 * @param uuid - UUID to validate
 * @returns True if valid UUID
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Validate phone number (basic validation)
 * @param phone - Phone number to validate
 * @returns True if valid
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  const cleaned = phone.replace(/[\s-()]/g, '');
  return phoneRegex.test(phone) && cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Validate URL format
 * @param url - URL to validate
 * @returns True if valid URL
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if value is empty (null, undefined, empty string, empty array)
 * @param value - Value to check
 * @returns True if empty
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}
