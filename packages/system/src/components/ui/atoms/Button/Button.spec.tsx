import { render } from '@testing-library/react'
import { Default, Disabled, Fluid, Large, Small } from './Button.stories'

/**
 * @file Tests - Button
 * @module  components/ui/atoms/Button/spec
 */

describe('Button', () => {
  it('renders a <button> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('button')
    expect(container.firstChild).toHaveClass('btn')
  })

  it('renders with the default button variant', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild).toHaveClass('btn-primary')
  })

  it('renders with a button background utility class', () => {
    const bg = 'danger'
    const { container } = render(<Default {...Default.args} variant={bg} />)

    expect(container.firstChild).toHaveClass(`btn-${bg}`)
  })

  it('renders a disabled button', () => {
    const { container } = render(<Disabled {...Disabled.args} />)

    expect(container.firstChild).toBeDisabled()
    expect(container.firstChild).toHaveAttribute('aria-disabled')
  })

  it('renders a full width button', () => {
    const { container } = render(<Fluid {...Fluid.args} />)

    expect(container.firstChild).toHaveClass('btn w-100')
  })

  it('renders a large button', () => {
    const { container } = render(<Large {...Large.args} />)

    expect(container.firstChild).toHaveClass('btn btn-lg')
  })

  it('renders a small button', () => {
    const { container } = render(<Small {...Small.args} />)

    expect(container.firstChild).toHaveClass('btn btn-sm')
  })
})
