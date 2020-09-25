import {
  button_size as size,
  button_variant as variant,
  color,
  StoryFN
} from '@kustomz-config'
import { Button, ButtonProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Button
 * @module stories/lib/elements/Button
 */

export default {
  argTypes: { color, size, variant },
  component: Button,
  title: 'Elements/Button'
}

export const Close: StoryFN<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
)

Close.args = {
  icon: { children: 'close' }
}

export const ThemeColor: StoryFN<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
)

ThemeColor.args = {
  children: 'Add to Cart',
  variant: 'primary'
}
