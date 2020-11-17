import { MDXBox } from '@system/components'
import {
  MarkdownMDX,
  PureMarkdown,
  PureMDX
} from '@system/stories/lib/atoms/MDXBox.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - MDXBox
 * @module tests/lib/atoms/MDXBox
 */

it('renders markdown and mdx', () => {
  const { container, getByText } = render(<MarkdownMDX {...MarkdownMDX.args} />)

  expect(container.firstChild).toHaveClass('mdx-box')

  expect(getByText('Hello, World')).toBeInTheDocument()
  expect(getByText(MDXBox.displayName as string)).toBeInTheDocument()
})

it('renders pure markdown', () => {
  const { getByText } = render(<PureMarkdown {...PureMarkdown.args} />)

  expect(getByText('Hello, World')).toBeInTheDocument()
})

it('renders pure mdx', () => {
  const { getByText } = render(<PureMDX {...PureMDX.args} />)

  expect(getByText(MDXBox.displayName as string)).toBeInTheDocument()
})
