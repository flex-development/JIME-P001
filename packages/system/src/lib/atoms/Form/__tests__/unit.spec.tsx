import { render } from '@testing-library/react'
import { Form } from '../Form'

/**
 * @file Unit Tests - Form
 * @module lib/atoms/Form/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Form', () => {
  describe('html', () => {
    it('renders <form> element', () => {
      const { container } = render(<Form />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('form')
    })
  })
})
