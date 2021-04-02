import { render } from '@testing-library/react'
import { DropdownMenu } from '../DropdownMenu'
import DROPDOWN_ITEMS from './__fixtures__/dropdown-items'

/**
 * @file Unit Tests - DropdownMenu
 * @module lib/molecules/DropdownMenu/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:DropdownMenu', () => {
  describe('html', () => {
    it('renders <ul> element with class "dropdown-menu"', () => {
      const props = { $items: DROPDOWN_ITEMS, 'aria-labelledby': '#' }

      const { container } = render(<DropdownMenu {...props} />)

      expect(container.firstChild).toHaveClass('dropdown-menu')
      expect(container.firstChild?.nodeName.toLowerCase()).toBe('ul')
    })
  })
})
