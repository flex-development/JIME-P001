import { Item } from '../Item'
import { List } from './List'
import type { ListProps } from './List.props'
import NAMES from './__tests__/__fixtures__/names'
import USERNAMES from './__tests__/__fixtures__/usernames'

/**
 * @file Stories - List
 * @module lib/atoms/List/stories
 */

export default {
  component: List,
  parameters: {
    jest: ['List']
  },
  subcomponents: { Item },
  title: 'Library/Atoms/List'
}

export const Ordered: FCS<ListProps> = args => <List {...args} />

Ordered.args = {
  $items: NAMES,
  is: 'ol'
}

export const Unordered: FCS<ListProps> = args => <List {...args} />

Unordered.args = {
  $items: USERNAMES
}
