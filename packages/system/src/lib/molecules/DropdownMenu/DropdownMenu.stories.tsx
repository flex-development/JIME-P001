import { DropdownMenu } from './DropdownMenu'
import type { DropdownMenuProps } from './DropdownMenu.props'
import DROPDOWN_ITEMS_VARIANTS from './__tests__/__fixtures__/dropdown-items-variants'

/**
 * @file Stories - Menu
 * @module lib/molecules/DropdownMenu/stories
 */

export default {
  args: { style: { top: '24px' } },
  component: DropdownMenu,
  parameters: {
    jest: ['DropdownMenu', 'List']
  },
  title: 'Library/Molecules/DropdownMenu'
}

export const ProductVariants: FCS<DropdownMenuProps> = args => (
  <DropdownMenu {...args} />
)

ProductVariants.args = {
  $items: DROPDOWN_ITEMS_VARIANTS,
  'aria-labelledby': '#',
  expanded: true
}
