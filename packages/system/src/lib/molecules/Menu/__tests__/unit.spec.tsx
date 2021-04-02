import { LinkProps } from '@system/lib/atoms'
import { render } from '@testing-library/react'
import { Menu } from '../Menu'
import { Sidebar } from '../Menu.stories'

/**
 * @file Unit Tests - Menu
 * @module lib/molecules/Menu/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Menu', () => {
  describe('html', () => {
    it('renders with class "menu"', () => {
      const { container } = render(<Menu />)

      expect(container.firstChild).toHaveClass('menu')
    })
  })

  describe('props', () => {
    describe('$items', () => {
      it('renders menu links', () => {
        const { getByRole } = render(<Sidebar {...Sidebar.args} />)

        Sidebar.args.$items?.map((link: LinkProps) => {
          const name = new RegExp(link.title as string, 'i')

          expect(getByRole('link', { name })).toHaveClass('menu-link')
        })
      })
    })
  })
})
