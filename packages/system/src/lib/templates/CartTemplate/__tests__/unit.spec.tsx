import { renderWithCartContextProvider as render } from '@system/tests/utils'
import { Cart } from '../CartTemplate.stories'

/**
 * @file Unit Tests - CartTemplate
 * @module lib/templates/CartTemplate/tests/unit
 */

describe('unit:CartTemplate', () => {
  describe('html', () => {
    it('renders <main> element with class "cart-template"', () => {
      const { container } = render(<Cart {...Cart.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('main')
      expect(container.firstChild).toHaveClass('cart-template')
    })
  })
})
