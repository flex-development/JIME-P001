import { render } from '@testing-library/react'
import { Form } from '../TextArea.stories'

/**
 * @file Unit Tests - TextArea
 * @module lib/atoms/TextArea/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:TextArea', () => {
  describe('html', () => {
    it('renders <textarea> element', () => {
      const { container } = render(<Form {...Form.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('textarea')
    })
  })

  describe('props', () => {
    describe('$form', () => {
      it('renders with class "form-control"', () => {
        const { container } = render(<Form {...Form.args} />)

        expect(container.firstChild).toHaveClass('form-control')
      })
    })
  })
})
