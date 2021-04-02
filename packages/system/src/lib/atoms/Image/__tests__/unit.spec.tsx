import { render } from '@testing-library/react'
import { Default, Fluid } from '../Image.stories'

/**
 * @file Unit Tests - Image
 * @module lib/atoms/Image/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Image', () => {
  describe('html', () => {
    it('renders <img> element', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('img')
    })
  })

  describe('props', () => {
    describe('$fluid', () => {
      it('renders with class "img-fluid"', () => {
        const { getByAltText } = render(<Fluid {...Fluid.args} />)
        const { alt } = Fluid.args

        expect(getByAltText(alt as string)).toHaveClass('img-fluid')
      })
    })
  })
})
