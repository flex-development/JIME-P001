import { render } from '@testing-library/react'
import { Default, Form } from '../Paragraph.stories'

/**
 * @file Unit Tests - Paragraph
 * @module lib/atoms/Paragraph/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Paragraph', () => {
  describe('html', () => {
    it('renders <p> element', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('p')
    })
  })

  describe('props', () => {
    describe('$form', () => {
      it('renders with class "form-text"', () => {
        const { container } = render(<Form {...Form.args} />)

        expect(container.firstChild).toHaveClass('form-text')
      })
    })

    describe('children', () => {
      it('renders paragraph text', () => {
        const { getByText } = render(<Default {...Default.args} />)

        expect(getByText(Default.args.children as string)).toBeInTheDocument()
      })
    })
  })
})
