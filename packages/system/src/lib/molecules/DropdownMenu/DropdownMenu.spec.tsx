import { ItemProps } from '@system/lib/atoms'
import { render } from '@testing-library/react'
import { ProductVariants } from './DropdownMenu.stories'

/**
 * @file Tests - DropdownMenu
 * @module lib/molecules/DropdownMenu/spec
 */

describe('DropdownMenu', () => {
  it('renders the product variant titles', () => {
    const { getByText } = render(<ProductVariants {...ProductVariants.args} />)

    ProductVariants.args.$items?.map((item: ItemProps) => {
      expect(getByText(item.children as string)).toBeInTheDocument()
    })
  })
})
