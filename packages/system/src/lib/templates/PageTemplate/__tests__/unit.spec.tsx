import { render } from '@testing-library/react'
import { Markdown } from '../PageTemplate.stories'

/**
 * @file Unit Tests - PageTemplate
 * @module lib/templates/PageTemplate/tests/unit
 */

describe('unit:PageTemplate', () => {
  describe('html', () => {
    it('renders <main> element with class "page-template"', () => {
      const { container } = render(<Markdown {...Markdown.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('main')
      expect(container.firstChild).toHaveClass('page-template')
    })
  })
})
