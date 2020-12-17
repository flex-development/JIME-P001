import { ItemProps } from '@system/components/ui/atoms'
import { render } from '@testing-library/react'
import { ProductVariants } from './DropdownMenu.stories'

/**
 * @file Tests - DropdownMenu
 * @module components/ui/molecules/DropdownMenu/spec
 */

describe('DropdownMenu', () => {
  it('renders the product variant titles', () => {
    const { getByText } = render(<ProductVariants {...ProductVariants.args} />)

    ProductVariants.args.items?.map((item: ItemProps) => {
      expect(getByText(item.children as string)).toHaveClass('dropdown-item')
    })
  })
})
