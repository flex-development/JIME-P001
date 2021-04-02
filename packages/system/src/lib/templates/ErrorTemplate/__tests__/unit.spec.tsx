import { render, screen } from '@testing-library/react'
import { NotFound } from '../ErrorTemplate.stories'

/**
 * @file Unit Tests - ErrorTemplate
 * @module lib/templates/ErrorTemplate/tests/unit
 */

describe('unit:ErrorTemplate', () => {
  describe('html', () => {
    it('renders <main> element with class "error-template"', () => {
      const { container } = render(<NotFound {...NotFound.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('main')
      expect(container.firstChild).toHaveClass('error-template')
    })
  })

  describe('props', () => {
    describe('code', () => {
      it('renders error code', () => {
        render(<NotFound {...NotFound.args} />)

        const element = screen.getByText(NotFound.args.code)

        expect(element).toHaveClass('error-template-code')
      })
    })

    describe('message', () => {
      it('renders error message', () => {
        render(<NotFound {...NotFound.args} />)

        const element = screen.getByText(NotFound.args.message)

        expect(element).toHaveClass('error-template-message')
      })
    })
  })
})
