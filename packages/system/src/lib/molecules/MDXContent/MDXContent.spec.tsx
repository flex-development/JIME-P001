import { render } from '@testing-library/react'
import { MDXContent } from './MDXContent'

/**
 * @file Tests - MDXContent
 * @module lib/molecules/MDXContent/spec
 */

describe('MDXContent', () => {
  it('renders with class "mdx-content"', () => {
    const { container } = render(<MDXContent />)

    expect(container.firstChild).toHaveClass('mdx-content')
  })
})
