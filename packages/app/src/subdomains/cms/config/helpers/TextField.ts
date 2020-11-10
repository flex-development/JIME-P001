import { AnyField } from '@tinacms/forms/build/field'

/**
 * @file TinaCMS Field Helper - Text
 * @module subdomains/cms/config/helpers/TextField
 */

/**
 * Returns the configuration for a text field.
 *
 * @see https://tinacms.org/docs/plugins/fields/text/
 *
 * @param name - Equivalent of an input's `name` attribute
 * @param label - Optional label to render above the field input
 * @param description - Optional description that expands on the purpose of the
 * field or prompts a specific action
 * @param placeholder - Optional text to appear in the input when it empty
 * @param defaultValue - Default text for the field
 */
const TextField = (
  name: string,
  label?: string,
  description?: string,
  placeholder?: string,
  defaultValue?: string
): AnyField => ({
  component: 'text',
  defaultValue,
  description,
  label,
  name,
  placeholder
})

export default TextField
