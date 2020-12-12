import { ItemProps } from '@system/components/atoms'
import { render } from '@testing-library/react'
import { ProductVariants } from './DropdownMenu.stories'

/**
 * @file Tests - DropdownMenu
 * @module components/molecules/DropdownMenu/spec
 */

it('renders the product variant titles', () => {
  const { getByText } = render(<ProductVariants {...ProductVariants.args} />)

  ProductVariants.args.items?.map((item: ItemProps) => {
    expect(getByText(item.children as string)).toHaveClass('dropdown-item')
  })
})
