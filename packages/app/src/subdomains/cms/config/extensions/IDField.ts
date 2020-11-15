import { Field } from '@tinacms/forms/build/field'
import { TextField } from '../helpers'

/**
 * @file Input a unique ID
 * @module subdomains/cms/config/extensions/IDField
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
const IDField = (description?: string, placeholder?: string): Field => {
  return TextField('id', 'ID', description, placeholder)
}

export default IDField
