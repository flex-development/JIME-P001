import { Field } from '@tinacms/forms/build/field'
import { TextField } from '../helpers'

/**
 * @file Input CSS classes
 * @module subdomains/cms/config/extensions/ClassNameField
 */

/**
 * Extends the TinaCMS Text field plugin.
 *
 * @see https://tinacms.org/docs/plugins/fields/text/
 *
 * @param description - Optional description that expands on the purpose of the
 * field or prompts a specific action
 * @param placeholder - Optional text to appear in the input when it empty
 */
const ClassNameField = (
  description = 'Additional CSS classes',
  placeholder = 'mr-24'
): Field => TextField('className', 'CSS Classes', description, placeholder)

export default ClassNameField
