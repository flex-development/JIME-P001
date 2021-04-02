import { render } from '@testing-library/react'
import { GridRow } from '../GridRow'

/**
 * @file Unit Tests - GridRow
 * @module lib/atoms/GridRow/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:GridRow', () => {
  describe('html', () => {
    it('renders <div> element', () => {
      const { container } = render(<GridRow />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('div')
    })
  })

  describe('props', () => {
    describe('$lg', () => {
      it('renders with class "lg:col-5"', () => {
        const { container } = render(<GridRow $lg={5} />)

        expect(container.firstChild).toHaveClass('lg:row-5')
      })

      it('renders with classes "lg:col-5" and "col-7"', () => {
        const { container } = render(<GridRow $lg={5} $xs={7} />)

        expect(container.firstChild).toHaveClass('lg:row-5')
        expect(container.firstChild).toHaveClass('row-7')
      })
    })

    describe('$md', () => {
      it('renders with class "md:col-full"', () => {
        const { container } = render(<GridRow $md />)

        expect(container.firstChild).toHaveClass('md:row-full')
      })
    })
  })
})
