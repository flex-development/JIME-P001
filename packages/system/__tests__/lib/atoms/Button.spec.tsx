import { ThemeColor } from '@kustomz/stories/lib/atoms/Button.stories'
import { render, screen } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - Button
 * @module tests/lib/atoms/Button
 */

it('renders a primary button "add to cart" button', () => {
  render(<ThemeColor {...ThemeColor.args} />)

  const button = screen.getByText('Add to Cart')

  expect(button).toBeInTheDocument()
  expect(button).toHaveClass('btn btn-primary')
})
