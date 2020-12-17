import { render } from '@testing-library/react'
import { Default } from './TextArea.stories'

/**
 * @file Tests - TextArea
 * @module components/ui/atoms/TextArea/spec
 */

describe('TextArea', () => {
  it('renders a <textarea> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('textarea')
  })

  it('renders with class "form-control"', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild).toHaveClass('form-control')
  })
})
