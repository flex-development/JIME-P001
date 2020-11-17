import { isString } from 'lodash'

/**
 * @file Converts a number to money format
 * @module utils/formatPrice
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
 * @returns Value in money format
 */
const formatPrice = (
  value: number | string,
  options: Partial<IntlNumberFormatOptionsCurrency> = {
    currency: 'USD',
    style: 'currency'
  }
): ReturnType<Intl.NumberFormat['format']> => {
  if (isString(value)) value = JSON.parse(value) as number

  if (value < 0) value = value * -1

  return new Intl.NumberFormat('en-US', options).format(value)
}

export default formatPrice
export type { IntlNumberFormatOptionsCurrency }
