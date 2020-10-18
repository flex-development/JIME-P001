import { Default } from '@system/stories/lib/organisms/Hero.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - Hero
 * @module tests/lib/organisms/Hero
 */

it('renders <section class="hero">', () => {
  const { container } = render(<Default {...Default.args} />)

  expect(container.firstChild).toHaveClass('hero')
})

it('renders the hero title', () => {
  const { getByText } = render(<Default {...Default.args} />)

  expect(getByText(Default.args.title)).toHaveClass('hero-title')
})

it('renders the hero subtitle', () => {
  const { getByText } = render(<Default {...Default.args} />)

  expect(getByText(Default.args.subtitle)).toHaveClass('hero-subtitle')
})
