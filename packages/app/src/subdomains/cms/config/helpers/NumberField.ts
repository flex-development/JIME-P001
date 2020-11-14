import { AnyField } from '@tinacms/forms/build/field'

/**
 * @file TinaCMS Field Helper - Number
 * @module subdomains/cms/config/helpers/NumberField
 */

/**
 * Returns the configuration for a number field.
 *
 * @see https://tinacms.org/docs/plugins/fields/number/
 *
 * @param name - Equivalent of an input's `name` attribute
 * @param label - Optional label to render above the field input
 * @param description - Optional description that expands on the purpose of the
 * field or prompts a specific action
 * @param defaultValue - Default value for the field
 * @param step - Interval to use when adjusting value
 */
const NumberField = (
  name: string,
  label?: string,
  description?: string,
  defaultValue?: number,
  step?: number
): AnyField => ({
  component: 'number',
  defaultValue,
  description,
  label,
  name,
  step
})

export default NumberField
