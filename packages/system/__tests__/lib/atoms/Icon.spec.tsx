import { render } from '@testing-library/react'
import React from 'react'
import {
  Menu,
  Person,
  Search
} from '../../../storybook/stories/lib/atoms/Icon.stories'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - Icon
 * @module tests/lib/atoms/Icon
 */

it('renders a menu icon', () => {
  const { getByText } = render(<Menu {...Menu.args} />)
  const { children } = (Menu.args || {}) as ArgsMatcher

  const element = getByText(children)

  expect(element).toHaveAttribute('data-ligature', children)

  expect(element).not.toHaveClass('material-icons')
  expect(element).toHaveClass('material-icons-outlined')
})

it('renders a solid style person icon', () => {
  const { getByText } = render(<Person {...Person.args} />)
  const { children } = (Person.args || {}) as ArgsMatcher

  const element = getByText(children)

  expect(element).toHaveAttribute('data-ligature', children)

  expect(element).toHaveClass('material-icons')
  expect(element).not.toHaveClass('material-icons-outlined')
})

it('renders a search icon', () => {
  const { getByText } = render(<Search {...Search.args} />)
  const { children } = (Search.args || {}) as ArgsMatcher

  const element = getByText(children)

  expect(element).toHaveAttribute('data-ligature', children)

  expect(element).not.toHaveClass('material-icons')
  expect(element).toHaveClass('material-icons-outlined')
})