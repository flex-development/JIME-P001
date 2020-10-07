import { AshTray } from '@kustomz-stories/molecules/ProductHeading.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - ProductHeading
 * @module tests/lib/molecules/ProductHeading
 */

it('renders the title and price of a product', () => {
  const { getByText } = render(<AshTray {...AshTray.args} />)

  const { price, title } = AshTray.args

  expect(getByText(`$${price}`)).toBeInTheDocument()
  expect(getByText(title)).toBeInTheDocument()
})
