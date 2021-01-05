import { Item } from '../Item'
import { List } from './List'
import { ListProps } from './List.props'

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
  $items: [
    {
      children: 'Chico McDonnell'
    },
    {
      children: 'Rhetta Wiley'
    },
    {
      children: 'Mordy Jadczak'
    },
    {
      children: 'Shalne Menezes'
    },
    {
      children: 'Lilly Tipping'
    },
    {
      children: 'Cal Gilburt'
    },
    {
      children: 'Alvan Greser'
    },
    {
      children: 'Nickolas McGowran'
    },
    {
      children: 'Annissa Wapplington'
    },
    {
      children: 'Cinnamon Truin'
    }
  ],
  is: 'ol'
}

export const Unordered: FCS<ListProps> = args => <List {...args} />

Unordered.args = {
  $items: [
    {
      children: 'ccornell0'
    },
    {
      children: 'rorhtmann1'
    },
    {
      children: 'gplaice2'
    },
    {
      children: 'sfibbens3'
    },
    {
      children: 'sbrunnen4'
    },
    {
      children: 'rserle5'
    },
    {
      children: 'tconti6'
    },
    {
      children: 'ebanisch7'
    },
    {
      children: 'pspurr8'
    },
    {
      children: 'hbardwell9'
    }
  ]
}
