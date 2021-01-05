import { isString } from 'lodash'

/**
 * @file Implementation - formatPrice
 * @module utils/formatPrice/impl
 */

type IntlNumberFormatOptionsCurrency = Pick<
  Intl.NumberFormatOptions,
  'currency' | 'currencyDisplay' | 'style'
>

/**
 * Converts {@param value} to a string in money format.
 *
 * @param value - Number to convert
 * @param options - Number format options
 * @return Value in money format
 */
const formatPrice = (
  value: number | string,
  options: Partial<IntlNumberFormatOptionsCurrency> = {
    currency: 'USD',
    style: 'currency'
  }
): ReturnType<Intl.NumberFormat['format']> => {
  // Convert strings into numbers
  if (isString(value)) value = JSON.parse(value) as number

  // If value is less than 0, convert into positive number
  if (value < 0) value = value * -1

  return new Intl.NumberFormat('en-US', options).format(value)
}

export default formatPrice
export type { IntlNumberFormatOptionsCurrency }
