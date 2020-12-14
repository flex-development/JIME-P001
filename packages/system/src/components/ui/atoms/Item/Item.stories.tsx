import { StoryFN } from '@system/types/storybook'
import { Item, ItemProps } from './Item'

/**
 * @file Stories - Item
 * @module components/ui/atoms/Item/stories
 */

export default {
  component: Item,
  parameters: {
    jest: ['Item']
  },
  title: 'Library/Atoms/Item'
}

/**
 * Default {@link Item} story.
 */
export const Default: StoryFN<ItemProps> = (args: ItemProps) => (
  <Item {...args} />
)

Default.args = {
  children: 'Item text'
}
