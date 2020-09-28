import { render } from '@testing-library/react'
import React from 'react'
import {
  Default,
  DropdownToggle,
  Nav
} from '../../../storybook/stories/lib/atoms/Link.stories'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - Link
 * @module tests/lib/atoms/Link
 */

it('renders <a href="#">', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { children } = (Default.args || {}) as ArgsMatcher

  expect(getByText(children)).toHaveAttribute('href', '#')
})

it('adds the class "active" when props.active is true', () => {
  const args: ArgsMatcher = Object.assign(
    {
      active: true
    },
    Default.args as ArgsMatcher
  )

  const { getByText } = render(<Default {...args} />)

  expect(getByText(args.children)).toHaveClass('active')
})

it('adds the class "disabled" when props.disabled is true', () => {
  const args: ArgsMatcher = Object.assign(
    {
      disabled: true
    },
    Default.args as ArgsMatcher
  )

  const { getByText } = render(<Default {...args} />)

  expect(getByText(args.children)).toHaveClass('disabled')
})

it('creates a dropdown toggle link when props.toggle is true', () => {
  const { getByText } = render(<DropdownToggle {...DropdownToggle.args} />)
  const { children } = (DropdownToggle.args || {}) as ArgsMatcher

  const element = getByText(children)

  expect(element).toHaveAttribute('aria-expanded', 'false')
  expect(element).toHaveAttribute('data-toggle', 'dropdown')
  expect(element).toHaveAttribute('role', 'button')
  expect(element).toHaveClass('dropdown-toggle')
})

it('adds the class "nav-link" when props.nav is true', () => {
  const { getByText } = render(<Nav {...Nav.args} />)
  const { children } = (Nav.args || {}) as ArgsMatcher

  expect(getByText(children)).toHaveClass('nav-link')
})
