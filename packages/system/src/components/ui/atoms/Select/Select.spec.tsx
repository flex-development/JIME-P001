import { render } from '@testing-library/react'
import { Default } from './Select.stories'

/**
 * @file Tests - Select
 * @module components/ui/atoms/Select/spec
 */

describe('Select', () => {
  it('renders a <select> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('select')
  })

  it('renders with nested elements', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild).not.toBeEmptyDOMElement()

    container.firstChild?.childNodes.forEach(({ nodeName }) => {
      expect(nodeName.toLowerCase()).toBe('option')
    })
  })
})
