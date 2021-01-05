import { render } from '@testing-library/react'
import { Default } from './Option.stories'

/**
 * @file Tests - Option
 * @module lib/atoms/Option/spec
 */

describe('Option', () => {
  it('renders an <option> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('option')
  })

  it('renders the label text', () => {
    const { getByLabelText } = render(<Default {...Default.args} />)

    expect(getByLabelText(Default.args.label as string)).toBeInTheDocument()
  })
})
