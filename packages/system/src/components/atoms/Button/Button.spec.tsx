import { render } from '@testing-library/react'
import { Button } from './Button'
import { Disabled, Fluid, Large, Small } from './Button.stories'

/**
 * @file Tests - Button
 * @module  components/atoms/Button/spec
 */

it('renders a primary button', () => {
  const args: ArgsMatcher = { children: 'Button text' }

  const { getByText } = render(<Button {...args} />)

  expect(getByText(args.children)).toHaveClass('btn btn-primary')
})

it('renders a disabled button', () => {
  const { getByText } = render(<Disabled {...Disabled.args} />)
  const { children } = Disabled.args as ArgsMatcher

  const button = getByText(children)

  expect(button).toBeDisabled()
  expect(button).toHaveAttribute('aria-disabled')
})

it('renders a full width button', () => {
  const { getByText } = render(<Fluid {...Fluid.args} />)
  const { children } = Fluid.args as ArgsMatcher

  expect(getByText(children)).toHaveClass('btn w-100')
})

it('renders a large button', () => {
  const { getByText } = render(<Large {...Large.args} />)
  const { children } = Large.args as ArgsMatcher

  expect(getByText(children)).toHaveClass('btn btn-lg')
})

it('renders a small button', () => {
  const { getByText } = render(<Small {...Small.args} />)
  const { children } = Small.args as ArgsMatcher

  expect(getByText(children)).toHaveClass('btn btn-sm')
})
