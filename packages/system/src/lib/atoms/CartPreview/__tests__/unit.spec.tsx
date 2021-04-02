import { renderWithCartContextProvider as render } from '@system/tests/utils'
import { Default } from '../CartPreview.stories'

/**
 * @file Unit Tests - CartPreview
 * @module lib/atoms/CartPreview/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:CartPreview', () => {
  describe('html', () => {
    it('renders <a> element with class "cart-preview"', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('a')
      expect(container.firstChild).toHaveClass('cart-preview')
    })
  })

  describe('props', () => {
    describe('href', () => {
      it('renders with user-defined href property', () => {
        const href = '/cart?discount=20'

        const { container } = render(<Default {...Default.args} href={href} />)

        expect(container.firstChild).toHaveAttribute('href', href)
      })
    })
  })
})
