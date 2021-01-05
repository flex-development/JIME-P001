import { render } from '@testing-library/react'
import { Box } from './Box'

/**
 * @file Tests - Box
 * @module lib/atoms/Box/spec
 */

describe('Box', () => {
  it('renders a <div> element', () => {
    const { container } = render(<Box />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('div')
  })
})
