import { render } from '@testing-library/react'
import { Default, Form } from '../Label.stories'

/**
 * @file Unit Tests - Label
 * @module lib/atoms/Label/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Label', () => {
  describe('html', () => {
    it('renders <label> element', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('label')
    })

    it('renders with data-required="true"', () => {
      const { container } = render(<Default {...Default.args} required />)

      expect(container.firstChild).toHaveAttribute('data-required', 'true')
    })
  })

  describe('props', () => {
    describe('$form', () => {
      it('renders with class "form-label"', () => {
        const { container } = render(<Form {...Form.args} />)

        expect(container.firstChild).toHaveClass('form-label')
      })
    })

    describe('required', () => {
      it('renders with asterisk next to label text', () => {
        const { container } = render(<Default {...Default.args} required />)

        const econtent = new RegExp(`${Default.args.children}*`)

        expect(container.firstChild).toHaveTextContent(econtent)
      })
    })
  })
})
