import { render } from '@testing-library/react'
import { Header } from '../Header'

/**
 * @file Unit Tests - Header
 * @module lib/atoms/Header/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Header', () => {
  describe('html', () => {
    it('renders <header> element', () => {
      const { container } = render(<Header />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('header')
    })
  })
})
