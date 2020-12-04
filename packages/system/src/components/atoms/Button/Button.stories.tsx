import {
  button_variant as variant,
  form_control_size as size
} from '@system/config'
import { useTransformScaleX } from '@system/hooks'
import { StoryFN } from '@system/types/storybook'
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

export const Block: StoryFN<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
)

Block.args = {
  block: true,
  children: 'Block level button'
}

export const Disabled: StoryFN<ButtonProps> = (args: ButtonProps) => {
  return <Button {...args} />
}

Disabled.args = {
  children: 'Disabled button',
  disabled: true
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

  return (
    <Button {...args} onClick={() => toggle()}>
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
