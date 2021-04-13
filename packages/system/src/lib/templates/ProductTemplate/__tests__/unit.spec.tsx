import { renderWithCartContextProvider as render } from '@system/tests/utils'
import { AshTray } from '../ProductTemplate.stories'

/**
 * @file Unit Tests - ProductTemplate
 * @module lib/templates/ProductTemplate/tests/unit
 */

describe('unit:ProductTemplate', () => {
  describe('html', () => {
    it('renders <main> element with class "product-template"', () => {
      const { container } = render(<AshTray {...AshTray.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('main')
      expect(container.firstChild).toHaveClass('product-template')
    })
  })
})
