import { render } from '@testing-library/react'
import { Default } from './Span.stories'

/**
 * @file Tests - Span
 * @module components/ui/atoms/Span/spec
 */

describe('Span', () => {
  it('renders a <span> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('span')
  })

  it('renders the span text', () => {
    const { getByText } = render(<Default {...Default.args} />)

    expect(getByText(Default.args.children as string)).toBeInTheDocument()
  })
})
