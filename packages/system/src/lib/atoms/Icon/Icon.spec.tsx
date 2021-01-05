import { render } from '@testing-library/react'
import { Cancel } from './Icon.stories'

/**
 * @file Tests - Icon
 * @module lib/atoms/Icon/spec
 */

describe('Icon', () => {
  it('renders with class "icon"', () => {
    const { container } = render(<Cancel {...Cancel.args} />)

    expect(container.firstChild).toHaveClass('icon')
    expect(container.firstChild).toHaveAttribute(
      'data-polaris-icon',
      'CancelSmallMinor'
    )
  })
})
