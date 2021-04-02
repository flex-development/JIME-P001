import { render } from '@testing-library/react'
import { Main } from '../Main'

/**
 * @file Unit Tests - Main
 * @module lib/atoms/Main/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Main', () => {
  describe('html', () => {
    it('renders <main> element', () => {
      const { container } = render(<Main />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('main')
    })
  })

  describe('props', () => {
    describe('template', () => {
      it('renders with class "template" and `data-template` attribute', () => {
        const ID = 'TEMPLATE_ID'

        const { container } = render(<Main data-template={ID} />)

        expect(container.firstChild).toHaveAttribute('data-template', ID)
        expect(container.firstChild).toHaveAttribute('id', ID)
        expect(container.firstChild).toHaveClass('template')
      })
    })
  })
})
