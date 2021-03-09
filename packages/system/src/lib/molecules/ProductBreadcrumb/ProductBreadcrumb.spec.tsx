import { render } from '@testing-library/react'
import { Default } from './ProductBreadcrumb.stories'

/**
 * @file Tests - ProductBreadcrumb
 * @module lib/molecules/ProductBreadcrumb/spec
 */

describe('ProductBreadcrumb', () => {
  it('renders with class "product-breadcrumb"', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild).toHaveClass('product-breadcrumb')
  })

  it('displays the collection link', () => {
    const { getByText } = render(<Default {...Default.args} />)

    const collection_title = Default.args.collection.title as string
    expect(getByText(collection_title)).toBeInTheDocument()
  })

  it('displays the product title', () => {
    const { getByText } = render(<Default {...Default.args} />)
    const { product } = Default.args

    expect(getByText(product as string)).toHaveClass('product-breadcrumb-p')
  })

  it('displays the product variant title', () => {
    const { getByText } = render(<Default {...Default.args} />)
    const { variant } = Default.args

    expect(getByText(variant as string)).toHaveClass('product-breadcrumb-v')
  })
})
