import {
  button_variant as variant,
  form_control_size as size
} from '@system/config'
import { useTransformScaleX } from '@system/hooks'
import { StoryFN } from '@system/types/storybook'
import { useRef } from 'react'
import { animated } from 'react-spring'
import { Button, ButtonProps } from './Button'
/**
 * @file Stories - Button
 * @module components/atoms/Button/stories
 */

export default {
  argTypes: { size, variant },
  component: Button,
  parameters: {
    jest: ['Button']
  },
  title: 'Library/Atoms/Button'
}

export const Default: StoryFN<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
)

Default.args = {
  children: 'Button text'
}

export const Disabled: StoryFN<ButtonProps> = (args: ButtonProps) => {
  return <Button {...args} />
}

Disabled.args = {
  children: 'Disabled button',
  disabled: true
}

export const Fluid: StoryFN<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
)

Fluid.args = {
  children: 'Fluid button',
  fluid: true
}

export const Large: StoryFN<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
)

Large.args = {
  children: 'Large button',
  size: 'lg'
}

export const ScaleButton: StoryFN<ButtonProps> = (args: ButtonProps) => {
  const { toggle, style } = useTransformScaleX()
  const ref = useRef<HTMLButtonElement>(null)

  console.debug(ref)

  return (
    <Button {...args} onClick={() => toggle()} ref={ref}>
      <animated.div style={style}>{args.children}</animated.div>
    </Button>
  )
}

ScaleButton.args = {
  children: 'Click!'
}

export const Small: StoryFN<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
)

Small.args = {
  children: 'Small button',
  size: 'sm'
}
