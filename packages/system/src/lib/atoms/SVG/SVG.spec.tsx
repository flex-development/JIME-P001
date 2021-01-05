import { render } from '@testing-library/react'
import { LoadingDonut } from './SVG.stories'

/**
 * @file Tests - SVG
 * @module lib/atoms/SVG/spec
 */

describe('SVG', () => {
  it('renders a <svg> element', () => {
    const { container } = render(<LoadingDonut {...LoadingDonut.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('svg')
  })
})
