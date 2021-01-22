import { Button } from './Button'
import type { ButtonProps } from './Button.props'

/**
 * @file Stories - Button
 * @module lib/atoms/Button/stories
 */

export default {
  component: Button,
  parameters: {
    jest: ['Button']
  },
  title: 'Library/Atoms/Button'
}

export const Default: FCS<ButtonProps> = args => <Button {...args} />

Default.args = {
  children: 'Button text'
}

export const Disabled: FCS<ButtonProps> = args => {
  return <Button {...args} />
}

Disabled.args = {
  children: 'Disabled button',
  disabled: true
}

export const Fluid: FCS<ButtonProps> = args => <Button {...args} />

Fluid.args = {
  $fluid: true,
  children: 'Fluid button'
}

export const ScaleButton: FCS<ButtonProps> = args => <Button {...args} />

ScaleButton.args = {
  $scale: true,
  children: 'Click!'
}
