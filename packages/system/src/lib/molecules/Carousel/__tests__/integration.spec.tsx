import PRODUCT from '@system/tests/fixtures/api/products/rolling-tray'
import { fireEvent, render, screen } from '@testing-library/react'
import { ProductImages } from '../Carousel.stories'

/**
 * @file Integration Tests - Carousel
 * @module lib/molecules/Carousel/tests/integration
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('integration:Carousel', () => {
  describe('simulate user', () => {
    it('updates carousel position when an indicator is clicked', () => {
      const { children = [] } = ProductImages.args

      render(<ProductImages {...ProductImages.args} />)

      // Get index and indicator of non-active item
      const position = children.length - 1
      const indicator = screen.queryAllByRole('button')[position]

      // Click non-active indicator
      fireEvent.click(indicator as HTMLElement)

      // Get alt text of image corresponding to clicked indicator
      const alt = PRODUCT.images[position].alt as string

      // Expect inner content of new active item to be visible
      expect(screen.getByAltText(alt)).toBeInTheDocument()
    })
  })
})
