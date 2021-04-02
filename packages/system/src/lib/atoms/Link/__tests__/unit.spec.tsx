import { render } from '@testing-library/react'
import { Button, Default, Dropdown, DropdownToggle, Nav } from '../Link.stories'

/**
 * @file Unit Tests - Link
 * @module lib/atoms/Link/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Link', () => {
  describe('html', () => {
    it('renders <a> element with default href attribute', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('a')
      expect(container.firstChild).toHaveAttribute('href', '#')
    })
  })

  describe('props', () => {
    describe('$active', () => {
      it('renders with class "active"', () => {
        const { getByText } = render(<Default {...Default.args} $active />)

        expect(getByText(Default.args.children as string)).toHaveClass('active')
      })
    })

    describe('$btn', () => {
      it('renders with class "btn"', () => {
        const { container } = render(<Button {...Button.args} />)

        expect(container.firstChild).toHaveClass(`btn btn-${Button.args.$btn}`)
      })
    })

    describe('$dropdown', () => {
      it('creates dropdown toggle link', () => {
        const { container } = render(
          <DropdownToggle {...DropdownToggle.args} />
        )

        expect(container.firstChild).toHaveAttribute('aria-expanded', 'false')
        expect(container.firstChild).toHaveAttribute('data-toggle', 'dropdown')
        expect(container.firstChild).toHaveClass('dropdown-toggle')
      })

      it('renders with class "dropdown-item"', () => {
        const { container } = render(<Dropdown {...Dropdown.args} />)

        expect(container.firstChild).toHaveClass('dropdown-item')
      })
    })

    describe('$nav', () => {
      it('renders with class "nav-link"', () => {
        const { getByText } = render(<Nav {...Nav.args} />)

        expect(getByText(Nav.args.children as string)).toHaveClass('menu-link')
      })
    })

    describe('disabled', () => {
      it('renders with class "disabled"', () => {
        const { container } = render(<Default {...Default.args} disabled />)

        expect(container.firstChild).toHaveClass('disabled')
      })
    })
  })
})
