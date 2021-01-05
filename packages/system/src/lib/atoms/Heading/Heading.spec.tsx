import { render } from '@testing-library/react'
import { Default } from './Heading.stories'

/**
 * @file Tests - Heading
 * @module lib/atoms/Heading/spec
 */

describe('Heading', () => {
  it('renders an <h1> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('h1')
  })

  it('renders an <h2> element', () => {
    const { container } = render(<Default {...Default.args} $size={2} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('h2')
  })

  it('renders an <h3> element', () => {
    const { container } = render(<Default {...Default.args} $size={3} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('h3')
  })

  it('renders an <h4> element', () => {
    const { container } = render(<Default {...Default.args} $size={4} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('h4')
  })

  it('renders an <h5> element', () => {
    const { container } = render(<Default {...Default.args} $size={5} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('h5')
  })

  it('renders an <h6> element', () => {
    const { container } = render(<Default {...Default.args} $size={6} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('h6')
  })

  it('renders the heading text', () => {
    const { getByText } = render(<Default {...Default.args} />)

    expect(getByText(Default.args.children as string)).toBeInTheDocument()
  })
})
