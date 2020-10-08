import {
  button_variant as variant,
  form_control_size as size,
  StoryFN
} from '@kustomz-config/index'
import { Button, ButtonProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Button
 * @module stories/lib/atoms/Button
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

export const Disabled: StoryFN<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
)

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

export const Small: StoryFN<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
)

Small.args = {
  children: 'Small button',
  size: 'sm'
}
