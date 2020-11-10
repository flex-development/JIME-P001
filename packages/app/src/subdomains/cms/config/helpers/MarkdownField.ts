import { Field } from '@tinacms/forms/build/field'

/**
 * @file TinaCMS Field Helper - Markdown
 * @module subdomains/cms/config/helpers/MarkdownField
 */

/**
 * Returns the configuration for a markdown input field.
 *
 * @see https://tinacms.org/packages/react-tinacms-editor/
 *
 * @param name - Equivalent of an input's `name` attribute
 * @param label - Optional label to render above the field input
 * @param description - Optional description that expands on the purpose of the
 * field or prompts a specific action
 * @param defaultValue - Default field value
 */
const MarkdownField = (
  name: string,
  label?: string,
  description?: string,
  defaultValue?: string
): Field => {
  return {
    component: 'markdown',
    defaultValue,
    description,
    label,
    name
  }
}

export default MarkdownField
