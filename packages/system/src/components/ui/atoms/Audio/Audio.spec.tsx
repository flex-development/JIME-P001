import { render } from '@testing-library/react'
import { ReactElement } from 'react'
import { Audio } from './Audio'

/**
 * @file Unit Tests - Audio
 * @module components/ui/atoms/Audio/spec
 */

it('renders an <audio> element', () => {
  const { container } = render(<Audio />)
  const element = (container.firstChild as unknown) as ReactElement

  expect(element.type).toBe('audio')
})
