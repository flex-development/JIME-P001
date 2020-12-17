import { render } from '@testing-library/react'
import { Default } from './Divider.stories'

/**
 * @file Tests - Divider
 * @module components/ui/atoms/Divider/spec
 */

describe('Divider', () => {
  it('renders an <hr> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('hr')
  })

  it('renders with class "divider"', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild).toHaveClass('divider')
  })
})
