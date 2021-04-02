import { render } from '@testing-library/react'
import { Form } from '../Option.stories'

/**
 * @file Unit Tests - Option
 * @module lib/atoms/Option/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Option', () => {
  describe('html', () => {
    it('renders <option> element', () => {
      const { container } = render(<Form {...Form.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('option')
    })
  })

  describe('props', () => {
    describe('label', () => {
      it('renders label text', () => {
        const { getByRole } = render(<Form {...Form.args} />)

        const name = new RegExp(Form.args.label as string, 'i')

        expect(getByRole('option', { name })).toBeInTheDocument()
      })
    })
  })
})
