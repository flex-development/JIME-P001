import { ProductImages } from '@system/stories/lib/organisms/Carousel.stories'
import { fireEvent, render, screen } from '@testing-library/react'
import React, { ReactElement } from 'react'

/**
 * @file Tests - Carousel
 * @module tests/lib/organisms/Carousel
 */

it('renders <div class="carousel">', () => {
  const { container } = render(<ProductImages {...ProductImages.args} />)

  expect(container.firstChild).toHaveClass('carousel')
})

it('renders the carousel items', () => {
  render(<ProductImages {...ProductImages.args} />)

  // Expect each inner carousel item to be in the document
  ProductImages.args.children.forEach((child: ReactElement) => {
    expect(screen.getByAltText(child?.props.alt)).toBeInTheDocument()
  })
})

it('renders the carousel indicators', () => {
  render(<ProductImages {...ProductImages.args} />)

  // Expect number of carousel indicators to match number of items
  const indicators = screen.queryAllByRole('button')
  expect(indicators.length).toBe(ProductImages.args.children.length)
})

it('sets the carousel position if props.position is valid', () => {
  render(<ProductImages {...ProductImages.args} />)

  // Get initial position and inner content of the active carousel item
  const initial_position = ProductImages.args.position as number
  const active = ProductImages.args.children[initial_position]

  // Expect inner content of active slide to be visible
  expect(screen.getByAltText(active.props.alt)).toBeInTheDocument()
})

it('updates the active item when an indicator is clicked', async () => {
  render(<ProductImages {...ProductImages.args} />)

  // Get initial position and inner content of the active carousel item
  const initial_position = ProductImages.args.position as number
  const initial = ProductImages.args.children[initial_position]

  // Get non-active indicator
  const indicator = screen.queryAllByRole('button').find((btn, i: number) => {
    return (ProductImages.args.position as number) !== i
  })

  // Click non-active indicator
  fireEvent.click(indicator as HTMLElement)

  // Expect active class to be removed the parent of the initial carousel item
  const initial_parent = screen.getByAltText(initial.props.alt).parentElement
  expect(initial_parent).not.toHaveClass('active')
})
