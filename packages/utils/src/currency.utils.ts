/**
 * Currency formatting utilities
 */

import { Currency } from '@shared/types';
import { CURRENCY_SYMBOLS } from '@shared/config';

/**
 * Format amount in cents to currency string
 * @param amountInCents - Amount in cents (smallest unit)
 * @param currency - Currency code
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amountInCents: number,
  currency: Currency = Currency.USD,
  locale = 'en-US'
): string {
  const amount = amountInCents / 100;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format amount with custom symbol
 * @param amountInCents - Amount in cents
 * @param currency - Currency code
 * @returns Formatted string with symbol
 */
export function formatCurrencyWithSymbol(
  amountInCents: number,
  currency: Currency = Currency.USD
): string {
  const amount = (amountInCents / 100).toFixed(2);
  const symbol = CURRENCY_SYMBOLS[currency] || currency;

  return `${symbol}${amount}`;
}

/**
 * Parse currency string to cents
 * @param currencyString - Currency string (e.g., "$123.45")
 * @returns Amount in cents
 */
export function parseCurrencyToCents(currencyString: string): number {
  const cleaned = currencyString.replace(/[^0-9.-]/g, '');
  const amount = parseFloat(cleaned);

  if (isNaN(amount)) {
    return 0;
  }

  return Math.round(amount * 100);
}

/**
 * Convert dollars to cents
 * @param dollars - Amount in dollars
 * @returns Amount in cents
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

/**
 * Convert cents to dollars
 * @param cents - Amount in cents
 * @returns Amount in dollars
 */
export function centsToDollars(cents: number): number {
  return cents / 100;
}

/**
 * Format amount without currency symbol
 * @param amountInCents - Amount in cents
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted number string
 */
export function formatAmount(amountInCents: number, decimals = 2): string {
  const amount = amountInCents / 100;
  return amount.toFixed(decimals);
}

/**
 * Get currency symbol for a currency code
 * @param currency - Currency code
 * @returns Currency symbol
 */
export function getCurrencySymbol(currency: Currency): string {
  return CURRENCY_SYMBOLS[currency] || currency;
}
