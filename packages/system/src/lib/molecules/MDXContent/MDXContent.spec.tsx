import { render } from '@testing-library/react'
import { MDXContent } from './MDXContent'
import { MarkdownMDX, PureMarkdown, PureMDX } from './MDXContent.stories'

/**
 * @file Tests - MDXContent
 * @module lib/molecules/MDXContent/spec
 */

describe('MDXContent', () => {
  it('renders with class "mdx-content"', () => {
    const { container } = render(<MDXContent />)

    expect(container.firstChild).toHaveClass('mdx-content')
  })

  it('renders markdown and mdx', () => {
    const { getByText } = render(<MarkdownMDX {...MarkdownMDX.args} />)

    expect(getByText('Hello, World')).toBeInTheDocument()
    expect(getByText(MDXContent.displayName as string)).toBeInTheDocument()
  })

  it('renders pure markdown', () => {
    const { getByText } = render(<PureMarkdown {...PureMarkdown.args} />)

    expect(getByText('Hello, World')).toBeInTheDocument()
  })

  it('renders pure mdx', () => {
    const { getByText } = render(<PureMDX {...PureMDX.args} />)

    expect(getByText(MDXContent.displayName as string)).toBeInTheDocument()
  })
})
