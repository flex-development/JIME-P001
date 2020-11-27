import { AnyObject } from '@flex-development/types'
import { AnyField } from '@tinacms/forms/build/field'
import { GroupListItemProps } from '../../utils'
import LinkField from './LinkField'

/**
 * @file Input a group of links
 * @module subdomains/cms/config/extensions/LinkListField
 */

/**
 * Extends the TinaCMS Group List field plugin.
 *
 * Returns the configuration for an array of `Link` component items.
 *
 * @see https://tinacms.org/docs/plugins/fields/group-list/
 *
 * @param name - Equivalent of an input's `name` attribute
 * @param label - Optional label to render above the field input
 * @param description - Optional description that expands on the purpose of the
 * field or prompts a specific action,
 * @param defaultItem - Object or function to provide the group-list item with
 * default data upon being created
 */
const LinkListField = (
  name: string,
  label?: string,
  description?: string,
  defaultItem?: AnyObject | (() => AnyObject)
): AnyField => ({
  component: 'group-list',
  defaultItem,
  description,
  fields: LinkField().fields,
  itemProps: ({ className, title, uuid }: AnyObject): GroupListItemProps => ({
    key: uuid,
    label: (title || className) as string
  }),
  label,
  name
})

export default LinkListField
