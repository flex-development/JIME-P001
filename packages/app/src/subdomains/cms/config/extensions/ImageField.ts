import { Field } from 'tinacms'
import { TextField } from '../helpers'
import ClassNameField from './ClassNameField'
import IDField from './IDField'
import URLField from './URLField'

/**
 * @file Group Field Extension - Image
 * @module subdomains/cms/config/extensions/ImageField
 * @see https://tinacms.org/docs/plugins/fields/group/
 */

/**
 * Extends the TinaCMS Group field plugin.
 *
 * Returns the configuration for a `Image` component field.
 *
 * @param name - Equivalent of an input's `name` attribute
 * @param label - Optional label to render above the field input
 * @param description - Optional description that expands on the purpose of the
 * field or prompts a specific action
 */
const ImageField = (
  name: string,
  label?: string,
  description?: string
): Field => ({
  component: 'group',
  description,
  fields: [
    URLField('src', 'Source'),
    TextField('alt', 'Alt'),
    ClassNameField(),
    IDField('Unique HTML element ID')
  ],
  label,
  name
})

export default ImageField
