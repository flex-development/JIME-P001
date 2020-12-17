import { render } from '@testing-library/react'
import { Main } from './Main'

/**
 * @file Tests - Main
 * @module components/ui/atoms/Main/spec
 */

describe('Main', () => {
  it('renders a <main> element', () => {
    const { container } = render(<Main />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('main')
  })
})
