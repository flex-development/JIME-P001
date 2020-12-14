import { render } from '@testing-library/react'
import { Default, DropdownToggle, Nav } from './Link.stories'

/**
 * @file Tests - Link
 * @module components/ui/atoms/Link/spec
 */

it('renders <a href="#">', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { children } = Default.args as ArgsMatcher

  expect(getByText(children)).toHaveAttribute('href', '#')
})

it('adds the class "active" when props.active is true', () => {
  const { getByText } = render(<Default {...Default.args} active />)
  const { children } = Default.args as ArgsMatcher

  expect(getByText(children)).toHaveClass('active')
})

it('adds the class "disabled" when props.disabled is true', () => {
  const { getByText } = render(<Default {...Default.args} disabled />)
  const { children } = Default.args as ArgsMatcher

  expect(getByText(children)).toHaveClass('disabled')
})

it('creates a dropdown toggle link when props.toggle is true', () => {
  const { getByText } = render(<DropdownToggle {...DropdownToggle.args} />)
  const { children } = DropdownToggle.args as ArgsMatcher

  const element = getByText(children)

  expect(element).toHaveAttribute('aria-expanded', 'false')
  expect(element).toHaveAttribute('data-toggle', 'dropdown')
  expect(element).toHaveAttribute('role', 'button')
  expect(element).toHaveClass('dropdown-toggle')
})

it('adds the class "nav-link" when props.nav is true', () => {
  const { getByText } = render(<Nav {...Nav.args} />)
  const { children } = Nav.args as ArgsMatcher

  expect(getByText(children)).toHaveClass('nav-link')
})