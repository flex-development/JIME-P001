import { AnyField } from '@tinacms/forms/build/field'

/**
 * @file Image field plugin helper
 * @module subdomains/cms/config/extensions/ImagePickerField
 */

/**
 * TinaCMS Image field plugin helper.
 *
 * @see https://tinacms.org/docs/plugins/fields/image/
 *
 * @param name - Equivalent of an input's `name` attribute
 * @param label - Optional label to render above the field input
 * @param description - Optional description that expands on the purpose of the
 * field or prompts a specific action
 */
const ImagePickerField = (
  name: string,
  label?: string,
  description?: string
): AnyField => ({ component: 'image', description, label, name })

export default ImagePickerField
