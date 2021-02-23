import { PRODUCTS } from '@tests/system/__mocks__/utils'
import { DropdownMenu } from './DropdownMenu'
import type { DropdownMenuProps } from './DropdownMenu.props'

/**
 * @file Stories - Menu
 * @module lib/molecules/DropdownMenu/stories
 */

export default {
  args: { style: { top: '24px' } },
  component: DropdownMenu,
  parameters: {
    jest: ['DropdownMenu']
  },
  title: 'Library/Molecules/DropdownMenu'
}

export const ProductVariants: FCS<DropdownMenuProps> = args => (
  <DropdownMenu {...args} />
)

ProductVariants.args = {
  $items: PRODUCTS[0].variants.map(({ id, title }) => ({
    $dropdown: true,
    children: title,
    'data-variant': id
  })),
  'aria-labelledby': '#',
  expanded: true
}
