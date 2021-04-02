import { render } from '@testing-library/react'
import { Select } from '../Select'
import { Form } from '../Select.stories'
import OPTIONS from './__fixtures__/options'

/**
 * @file Unit Tests - Select
 * @module lib/atoms/Select/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Select', () => {
  describe('html', () => {
    it('renders <select> element', () => {
      const { container } = render(<Select $options={OPTIONS} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('select')
    })
  })

  describe('props', () => {
    describe('$options', () => {
      it('renders nested <option> elements', () => {
        const { getByRole } = render(<Select $options={OPTIONS} />)

        // Expect child elements to rendered
        OPTIONS.forEach(({ label, value }) => {
          const element = getByRole('option', { name: label })

          expect(element).toBeInTheDocument()
          expect(element?.nodeName.toLowerCase()).toBe('option')
          expect(element).toHaveValue(`${value}`)
        })
      })
    })

    describe('$form', () => {
      it('renders with class "form-select"', () => {
        const { container } = render(<Form {...Form.args} />)

        expect(container.firstChild).toHaveClass('form-select')
      })
    })
  })
})
