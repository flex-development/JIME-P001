import { render, screen } from '@testing-library/react'
import React from 'react'
import { ThemeColor } from '../../../storybook/stories/lib/atoms/Button.stories'

/**
 * @file Tests - Button
 * @module tests/lib/atoms/Button
 */

it('renders a primary "add to cart" button', () => {
  render(<ThemeColor {...ThemeColor.args} />)

  const button = screen.getByText('Add to Cart')

  expect(button).toBeInTheDocument()
  expect(button).toHaveClass('btn btn-primary')
})
