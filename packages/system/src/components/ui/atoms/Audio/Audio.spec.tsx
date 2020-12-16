import { render } from '@testing-library/react'
import { Audio } from './Audio'

/**
 * @file Unit Tests - Audio
 * @module components/ui/atoms/Audio/spec
 */

it('renders an <audio> element', () => {
  const { container } = render(<Audio />)

  expect(container.firstChild).toMatchInlineSnapshot('<audio />')
})
