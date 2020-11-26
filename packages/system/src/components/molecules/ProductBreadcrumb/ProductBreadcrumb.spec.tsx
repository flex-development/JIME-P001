import { render } from '@testing-library/react'
import React from 'react'
import { Default } from './ProductBreadcrumb.stories'

/**
 * @file Tests - ProductBreadcrumb
 * @module components/molecules/ProductBreadcrumb/spec
 */

it('renders without crashing', () => {
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

  expect(getByText(Default.args.product)).toHaveClass('product-breadcrumb-p')
})

it('displays the product variant title', () => {
  const { getByText } = render(<Default {...Default.args} />)

  expect(getByText(Default.args.variant)).toHaveClass('product-breadcrumb-v')
})
