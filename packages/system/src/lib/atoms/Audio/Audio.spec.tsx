import { render } from '@testing-library/react'
import { Audio } from './Audio'

/**
 * @file Tests - Audio
 * @module lib/atoms/Audio/spec
 */

describe('Audio', () => {
  it('renders an <audio> element', () => {
    const { container } = render(<Audio />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('audio')
  })
})
