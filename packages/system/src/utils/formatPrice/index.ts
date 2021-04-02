import type { NumberString } from '@flex-development/kustomzcore'

/**
 * @file Implementation - formatPrice
 * @module utils/formatPrice
 */

type IntlNumberFormatOptionsCurrency = Pick<
  Intl.NumberFormatOptions,
  'currency' | 'currencyDisplay' | 'style'
>

/**
 * Converts {@param value} to a string in money format.
 *
 * @param {NumberString} value - Number to convert
 * @param {Partial<IntlNumberFormatOptionsCurrency>} [options] - Format options
 * @return {string} Formatted money string
 */
const formatPrice = (
  value: NumberString,
  options: Partial<IntlNumberFormatOptionsCurrency> = {
    currency: 'USD',
    style: 'currency'
  }
): ReturnType<Intl.NumberFormat['format']> => {
  // Convert strings into numbers
  if (typeof value === 'string') value = JSON.parse(value) as number

  // If value is less than 0, convert into positive number
  if (value < 0) value = value * -1

  return new Intl.NumberFormat('en-US', options).format(value)
}

export default formatPrice
export type { IntlNumberFormatOptionsCurrency }
