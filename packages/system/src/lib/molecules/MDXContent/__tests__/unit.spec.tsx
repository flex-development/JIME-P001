import { render, waitFor } from '@testing-library/react'
import { MDXContent } from '../MDXContent'
import { MarkdownMDX, PureMarkdown, PureMDX } from '../MDXContent.stories'

/**
 * @file Unit Tests - MDXContent
 * @module lib/molecules/MDXContent/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:MDXContent', () => {
  describe('html', () => {
    it('renders with class "mdx-content"', () => {
      const { container } = render(<MDXContent />)

      expect(container.firstChild).toHaveClass('mdx-content')
    })
  })

  describe('props', () => {
    describe('code', () => {
      const matcher = new RegExp('Hello, World', 'i')

      it('renders markdown and mdx', async () => {
        const { getByText } = render(<MarkdownMDX {...MarkdownMDX.args} />)

        await waitFor(() => {
          expect(getByText(matcher)).toBeInTheDocument()
        })
      })

      it('renders pure markdown', async () => {
        const { getByText } = render(<PureMarkdown {...PureMarkdown.args} />)

        await waitFor(() => {
          expect(getByText(matcher)).toBeInTheDocument()
        })
      })

      it('renders pure mdx', async () => {
        const { getByText } = render(<PureMDX {...PureMDX.args} />)

        await waitFor(() => {
          expect(getByText(matcher)).toBeInTheDocument()
        })
      })
    })
  })
})
