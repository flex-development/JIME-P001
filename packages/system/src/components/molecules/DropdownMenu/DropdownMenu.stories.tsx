import { PRODUCTS } from '@system-mocks/utils'
import { StoryFN } from '@system/types/storybook'
import { DropdownMenu, DropdownMenuProps } from './DropdownMenu'

/**
 * @file Stories - Menu
 * @module components/molecules/DropdownMenu/stories
 */

export default {
  args: { style: { top: '24px' } },
  component: DropdownMenu,
  parameters: {
    jest: ['DropdownMenu']
  },
  title: 'Library/Molecules/DropdownMenu'
}

export const ProductVariants: StoryFN<DropdownMenuProps> = (
  args: DropdownMenuProps
) => <DropdownMenu {...args} />

ProductVariants.args = {
  items: PRODUCTS[0].variants.map(({ id, title }) => ({
    children: title,
    'data-variant': id
  })),
  open: true
}
