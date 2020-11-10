import { Field } from '@tinacms/forms/build/field'
import { TextField } from '../helpers'
import ButtonVariantField from './ButtonVariantField'
import ClassNameField from './ClassNameField'
import IDField from './IDField'
import URLField from './URLField'

/**
 * @file Group Field Extension - Link
 * @module subdomains/cms/config/extensions/LinkField
 * @see https://tinacms.org/docs/plugins/fields/group/
 */

/**
 * Extends the TinaCMS Group field plugin.
 *
 * Returns the configuration for a `Link` component input field.
 *
 * @see https://tinacms.org/docs/plugins/fields/group/
 *
 * @param name - Equivalent of an input's `name` attribute
 * @param label - Optional label to render above the field input
 * @param description - Optional description that expands on the purpose of the
 * field or prompts a specific action
 */
const LinkField = (
  name = 'link',
  label?: string,
  description?: string
): Field => {
  return {
    component: 'group',
    description,
    fields: [
      TextField('title', 'Title'),
      URLField('href', 'URL'),
      {
        component: 'select',
        description: 'Open in new tab?',
        label: 'Target',
        name: 'target',
        options: [
          { label: 'No', value: undefined },
          { label: 'Yes', value: '_blank' }
        ]
      },
      ButtonVariantField(
        'btn',
        'Background / Outline Color',
        'Select a link background or outline color'
      ),
      ClassNameField(),
      IDField('Unique HTML element ID', 'special-link')
    ],
    label,
    name
  }
}

export default LinkField
