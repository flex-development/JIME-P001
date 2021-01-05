import { render } from '@testing-library/react'
import { Default, Disabled, Fluid } from './Button.stories'

/**
 * @file Tests - Button
 * @module  lib/atoms/Button/spec
 */

describe('Button', () => {
  it('renders a <button> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('button')
    expect(container.firstChild).toHaveClass('btn')
  })

  it('renders with a button background utility class', () => {
    const bg = 'danger'
    const { container } = render(<Default {...Default.args} $variant={bg} />)

    expect(container.firstChild).toHaveClass(`btn-${bg}`)
  })

  it('renders a disabled button', () => {
    const { container } = render(<Disabled {...Disabled.args} />)

    expect(container.firstChild).toBeDisabled()
    expect(container.firstChild).toHaveAttribute('aria-disabled')
  })

  it('renders a full width button', () => {
    const { container } = render(<Fluid {...Fluid.args} />)

    expect(container.firstChild).toHaveClass('btn btn-fluid')
  })
})
