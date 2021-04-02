import { render } from '@testing-library/react'
import { Default } from '../Divider.stories'

/**
 * @file Unit Tests - Divider
 * @module lib/atoms/Divider/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Divider', () => {
  describe('html', () => {
    it('renders <hr> element', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('hr')
    })
  })
})
