import { Field } from '@tinacms/forms/build/field'

/**
 * @file TinaCMS Field Helper - TextArea
 * @module subdomains/cms/config/helpers/TextAreaField
 */

/**
 * Returns the configuration for a textarea field.
 *
 * @see https://tinacms.org/docs/plugins/fields/textarea/
 *
 * @param name - Equivalent of an input's `name` attribute
 * @param label - Optional label to render above the field input
 * @param description - Optional description that expands on the purpose of the
 * field or prompts a specific action
 */
const TextAreaField = (
  name: string,
  label?: string,
  description?: string
): Field => ({ component: 'textarea', description, label, name })

export default TextAreaField
