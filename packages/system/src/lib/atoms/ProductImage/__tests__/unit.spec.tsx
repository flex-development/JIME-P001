import { render } from '@testing-library/react'
import { AshTray } from '../ProductImage.stories'

/**
 * @file Unit Tests - ProductImage
 * @module lib/atoms/ProductImage/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:ProductImage', () => {
  describe('html', () => {
    it('renders <img> element with class "product-img"', () => {
      const { container } = render(<AshTray {...AshTray.args} />)

      const element = container.firstChild?.firstChild?.lastChild

      expect(element).toHaveClass('product-img')
    })
  })
})
