import { AnyObject } from '@flex-development/kustomtypez'
import classnames from 'classnames'
import { ClassDictionary } from 'classnames/types'

/**
 * @file Generate a string containing Bootstrap utility classes
 * @module modules/utilityclass
 * @see {@link https://v5.getbootstrap.com/docs/5.0/utilities/api/}
 */

/**
 * Generates a string of utility classes.
 *
 * @param prefix - Class prefix
 * @param values - Utility values to apply as classes
 * @return Object containing utility class and class dictionary
 */
export const utilityclassnames = (
  prefix?: string,
  ...values: string[]
): { className: string; dictionary: ClassDictionary } | null => {
  // If missing class prefix or values to use values
  if (!prefix?.length || !values?.length) return null

  // Create class dictionary
  const dictionary: AnyObject = {}

  // Add utility classes to dictionary
  values.forEach(value => (dictionary[`${prefix}-${value}`] = true))

  // Return string of utility classes and class dictionary
  return { className: classnames(dictionary), dictionary }
}
