import { render } from '@testing-library/react'
import { Default } from './Paragraph.stories'

/**
 * @file Tests - Paragraph
 * @module components/ui/atoms/Paragraph/spec
 */

describe('Paragraph', () => {
  it('renders a <p> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('p')
  })

  it('renders the paragraph text', () => {
    const { getByText } = render(<Default {...Default.args} />)
    const { children } = Default.args as ArgsMatcher

    expect(getByText(children)).toBeInTheDocument()
  })
})
