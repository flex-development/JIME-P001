import { Field } from '@tinacms/forms/build/field'

/**
 * @file Toggle Field Helper
 * @module subdomains/cms/config/extensions/ToggleField
 */

/**
 * Returns the configuration for a boolean input field.
 *
 * @see https://tinacms.org/docs/plugins/fields/toggle/
 *
 * @param name - Equivalent of an input's `name` attribute
 * @param label - Optional label to render above the field input
 * @param description - Optional description that expands on the purpose of the
 * field or prompts a specific action
 * @param defaultValue - Default field value
 */
const ToggleField = (
  name: string,
  label?: string,
  description?: string,
  defaultValue?: boolean
): Field => {
  return {
    component: 'toggle',
    defaultValue,
    description,
    label,
    name
  }
}

export default ToggleField
