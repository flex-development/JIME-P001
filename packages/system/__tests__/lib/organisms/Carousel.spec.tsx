import {
  Default,
  Manual
} from '@kustomz-stories/organisms/Carousel.stories'
import { fireEvent, render, screen } from '@testing-library/react'
import React, { ReactElement } from 'react'

/**
 * @file Tests - Carousel
 * @module tests/lib/organisms/Carousel
 */

it('renders <div class="carousel">', () => {
  const { container } = render(<Default {...Default.args} />)

  expect(container.firstChild).toHaveClass('carousel')
})

it('renders the carousel items', () => {
  render(<Default {...Default.args} />)

  // Expect each inner carousel item to be in the document
  Default.args.children.forEach((child: ReactElement) => {
    expect(screen.getByAltText(child?.props.alt)).toBeInTheDocument()
  })
})

it('renders the carousel indicators', () => {
  render(<Default {...Default.args} />)

  // Expect number of carousel indicators to match number of items
  const indicators = screen.queryAllByRole('button')
  expect(indicators.length).toBe(Default.args.children.length)
})

it('sets the carousel position if props.position is valid', () => {
  render(<Manual {...Manual.args} />)

  // Get initial position and inner content of the active carousel item
  const active = Manual.args.children[Manual.args.position as number]

  // Expect inner content of active slide to be visible
  expect(screen.getByAltText(active.props.alt)).toBeInTheDocument()
})

it('updates the active item when an indicator is clicked', async () => {
  render(<Manual {...Manual.args} />)

  // Get initial position and inner content of the active carousel item
  const initial = Manual.args.children[Manual.args.position as number]

  // Get non-active indicator
  const indicator = screen.queryAllByRole('button').find((btn, i: number) => {
    return (Manual.args.position as number) !== i
  })

  // Click non-active indicator
  fireEvent.click(indicator as HTMLElement)

  // Expect active class to be removed the parent of the initial carousel item
  const initial_parent = screen.getByAltText(initial.props.alt).parentElement
  expect(initial_parent).not.toHaveClass('active')
})
