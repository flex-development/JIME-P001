import { render } from '@testing-library/react'
import { Default } from './Hero.stories'

/**
 * @file Tests - Hero
 * @module lib/organisms/Hero/spec
 */

describe('Hero', () => {
  it('renders with class "hero"', () => {
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
})
