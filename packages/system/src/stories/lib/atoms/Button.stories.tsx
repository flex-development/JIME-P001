import {
  button_variant as variant,
  form_control_size as size,
  StoryFN
} from '@kustomz-config'
import { Button, ButtonProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Button
 * @module stories/lib/atoms/Button
 */

export default {
  argTypes: { size, variant },
  component: Button,
  title: 'Library/Atoms/Button'
}

export const ThemeColor: StoryFN<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
)

ThemeColor.args = {
  children: 'Add to Cart',
  variant: 'primary'
}
