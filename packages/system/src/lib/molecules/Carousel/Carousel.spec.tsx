import { fireEvent, render, screen } from '@testing-library/react'
import findIndex from 'lodash/findIndex'
import { ReactElement } from 'react'
import { ProductReviews } from './Carousel.stories'

/**
 * @file Tests - Carousel
 * @module lib/molecules/Carousel/spec
 */

describe('Carousel', () => {
  it('renders with class "carousel"', () => {
    const { container } = render(<ProductReviews {...ProductReviews.args} />)

    expect(container.firstChild).toHaveClass('carousel')
  })

  it('renders the carousel items', () => {
    const { children } = ProductReviews.args

    const { container } = render(<ProductReviews {...ProductReviews.args} />)
    const { childNodes } = container.firstChild?.firstChild as HTMLElement

    // Expect each carousel item to be in the document
    expect(childNodes.length).toBe(children.length)
  })

  it('renders the carousel indicators', () => {
    render(<ProductReviews {...ProductReviews.args} />)

    // Expect number of carousel indicators to match number of items
    const indicators = screen.queryAllByRole('button')
    expect(indicators.length).toBe(ProductReviews.args.children.length)
  })

  it('updates the active item when an indicator is clicked', () => {
    const { children, position } = ProductReviews.args
    const { getByText } = render(<ProductReviews {...ProductReviews.args} />)

    // Get index of non-active item
    const item_i = findIndex(children, (child: ReactElement, i) => {
      return (position as number) !== i
    })

    // Get indicator of non-active item
    const indicator = screen.queryAllByRole('button')[item_i]

    // Click non-active indicator
    fireEvent.click(indicator as HTMLElement)

    // Expect inner content of new active item to be visible
    expect(getByText(children[item_i].props.review.body)).toBeInTheDocument()
  })
})
