import { Field } from '@tinacms/forms/build/field'
import { TextField } from '../helpers'

/**
 * @file Insert URLs
 * @module subdomains/cms/config/extensions/URLField
 */

/**
 * Extends the TinaCMS Text field plugin.
 *
 * Returns the configuration for a URL input.
 *
 * @see https://tinacms.org/docs/plugins/fields/text/
 *
 * @param name - Equivalent of an input's `name` attribute
 * @param label - Optional label to render above the field input
 * @param description - Optional description that expands on the purpose of the
 * field or prompts a specific action
 * @param placeholder - Optional text to appear in the input when it empty
 * @param defaultValue - Default field value
 */
const URLField = (
  name: string,
  label?: string,
  description?: string,
  placeholder?: string,
  defaultValue?: string
): Field => ({
  ...TextField(name, label, description, placeholder),
  defaultValue: defaultValue
})

export default URLField
