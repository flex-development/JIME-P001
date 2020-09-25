import {List, ListProps} from '@kustomz'
import {StoryFN} from '@kustomz-config'
import React from 'react'

/**
 * @file Stories - List
 * @module stories/lib/elements/List
 */

export default {
  component: List,
  title: 'Elements/List',
}

/**
 * Ordered {@link List} story.
 */
export const Ordered: StoryFN<ListProps> = (args: ListProps) => (
  <List {...args} />
)

Ordered.args = {
  is: 'ol',
  items: [
    {
      children: 'Chico McDonnell',
    },
    {
      children: 'Rhetta Wiley',
    },
    {
      children: 'Mordy Jadczak',
    },
    {
      children: 'Shalne Menezes',
    },
    {
      children: 'Lilly Tipping',
    },
    {
      children: 'Cal Gilburt',
    },
    {
      children: 'Alvan Greser',
    },
    {
      children: 'Nickolas McGowran',
    },
    {
      children: 'Annissa Wapplington',
    },
    {
      children: 'Cinnamon Truin',
    },
  ],
}

/**
 * Unordered {@link List} story.
 */
export const Unordered: StoryFN<ListProps> = (args: ListProps) => (
  <List {...args} />
)

Unordered.args = {
  items: [
    {
      children: 'ccornell0',
    },
    {
      children: 'rorhtmann1',
    },
    {
      children: 'gplaice2',
    },
    {
      children: 'sfibbens3',
    },
    {
      children: 'sbrunnen4',
    },
    {
      children: 'rserle5',
    },
    {
      children: 'tconti6',
    },
    {
      children: 'ebanisch7',
    },
    {
      children: 'pspurr8',
    },
    {
      children: 'hbardwell9',
    },
  ],
}
