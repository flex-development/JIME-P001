import { render } from '@testing-library/react'
import { GridColumn } from '../GridColumn'

/**
 * @file Unit Tests - GridColumn
 * @module lib/atoms/GridColumn/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:GridColumn', () => {
  describe('html', () => {
    it('renders <div> element', () => {
      const { container } = render(<GridColumn />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('div')
    })
  })

  describe('props', () => {
    describe('$lg', () => {
      it('renders with class "lg:col-5"', () => {
        const { container } = render(<GridColumn $lg={5} />)

        expect(container.firstChild).toHaveClass('lg:col-5')
      })

      it('renders with classes "lg:col-5" and "col-7"', () => {
        const { container } = render(<GridColumn $lg={5} $xs={7} />)

        expect(container.firstChild).toHaveClass('lg:col-5')
        expect(container.firstChild).toHaveClass('col-7')
      })
    })

    describe('$md', () => {
      it('renders with class "md:col-full"', () => {
        const { container } = render(<GridColumn $md />)

        expect(container.firstChild).toHaveClass('md:col-full')
      })
    })
  })
})
