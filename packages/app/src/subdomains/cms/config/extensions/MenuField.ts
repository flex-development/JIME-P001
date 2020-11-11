import { uuid } from '@flex-development/kustomzdesign/utils'
import { AnyField } from '@tinacms/forms'
import { TextField } from '../helpers'
import ClassNameField from './ClassNameField'
import IDField from './IDField'
import LinkListField from './LinkListField'

/**
 * @file Group Field Extension - Menu
 * @module subdomains/cms/config/extensions/MenuField
 * @see https://tinacms.org/docs/plugins/fields/group/
 */

/**
 * Extends the TinaCMS Group field plugin.
 *
 * Returns the configuration for a `Menu` component input field.
 *
 * @see https://tinacms.org/docs/plugins/fields/group/
 *
 * @param name - Equivalent of an input's `name` attribute
 * @param label - Optional label to render above the field input
 * @param description - Optional description that expands on the purpose of the
 * field or prompts a specific action
 */
const MenuField = (
  name: string,
  label?: string,
  description?: string
): AnyField => ({
  component: 'group',
  defaultValue: {
    links: [],
    title: 'Menu Title',
    uuid: (() => uuid())()
  },
  description,
  fields: [
    TextField('title', 'Title'),
    LinkListField('links', 'Links', undefined, {
      href: '#',
      title: '',
      uuid: (() => uuid())()
    }),
    ClassNameField(),
    IDField('Unique HTML element ID')
  ],
  label,
  name
})

export default MenuField
