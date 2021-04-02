import DATA_TYPES from '@system/lib/atoms/Input/__tests__/__fixtures__/types'
import { render } from '@testing-library/react'
import { FormField } from '../FormField'
import type { FormFieldProps } from '../FormField.props'
import DATA_CONTROLS from './__fixtures__/data-controls'

/**
 * @file Unit Tests - FormField
 * @module lib/molecules/FormField/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:FormField', () => {
  describe('html', () => {
    it('renders with class "form-field"', () => {
      const { container } = render(<FormField label='' />)

      expect(container.firstChild).toHaveClass('form-field')
    })
  })

  describe('props', () => {
    describe('data-control', () => {
      it('renders with attribute `data-control`', () => {
        DATA_CONTROLS.forEach(control => {
          const props: FormFieldProps = {
            'data-control': control,
            label: `dummy ${control} form component`
          }

          const { container } = render(<FormField {...props} />)
          const element = container.firstChild

          expect(element).toHaveAttribute('data-control')
          expect(element).toHaveProperty('dataset.control', control)
        })
      })
    })

    describe('data-type', () => {
      it('renders with attribute `data-type`', () => {
        DATA_TYPES.forEach(type => {
          const props: FormFieldProps = {
            'data-type': type,
            label: `dummy ${type} input`
          }

          const { container } = render(<FormField {...props} />)
          const element = container.firstChild

          expect(element).toHaveAttribute('data-type')
          expect(element).toHaveProperty('dataset.type', type)
        })
      })
    })

    describe('label', () => {
      it('renders label text', () => {
        const label = 'form label'

        const { getByText } = render(<FormField label={label} />)

        expect(getByText(label)).toHaveClass('form-field-label')
      })
    })
  })
})
