import { render, screen } from '@testing-library/react'
import { Search } from '../SearchTemplate.stories'

/**
 * @file Unit Tests - SearchTemplate
 * @module lib/templates/SearchTemplate/tests/unit
 */

describe('unit:SearchTemplate', () => {
  describe('html', () => {
    it('renders <main> element with class "search-template"', () => {
      const { container } = render(<Search {...Search.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('main')
      expect(container.firstChild).toHaveClass('search-template')
    })
  })

  describe('props', () => {
    describe('results', () => {
      it('renders template title with number of search results', () => {
        render(<Search {...Search.args} />)

        const element = screen.getByText(`(${Search.args.results?.length})`)

        expect(element).toBeInTheDocument()
      })
    })
  })
})
