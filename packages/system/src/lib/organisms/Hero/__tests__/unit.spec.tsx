import { render, screen } from '@testing-library/react'
import { Default } from '../Hero.stories'

/**
 * @file Unit Tests - Hero
 * @module lib/organisms/Hero/tests/unit
 */

describe('unit:Hero', () => {
  describe('html', () => {
    it('renders <section> element with class "hero"', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('section')
      expect(container.firstChild).toHaveClass('hero')
    })
  })

  describe('props', () => {
    const { subtitle, title } = Default.args

    describe('subtitle', () => {
      it('renders hero subtitle', () => {
        render(<Default {...Default.args} />)

        expect(screen.getByText(subtitle)).toHaveClass('hero-subtitle')
      })
    })

    describe('title', () => {
      it('renders hero title', () => {
        render(<Default {...Default.args} />)

        expect(screen.getByText(title)).toHaveClass('hero-title')
      })
    })
  })
})
