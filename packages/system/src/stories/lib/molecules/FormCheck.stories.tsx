import { FormCheck, FormCheckProps } from '@system/lib'
import { StoryFN } from '@system/types'
import React from 'react'

/**
 * @file Stories - FormCheck
 * @module stories/lib/molecules/FormCheck
 */

export default {
  component: FormCheck,
  parameters: {
    jest: ['FormCheck']
  },
  title: 'Library/Molecules/FormCheck'
}

export const Checkbox: StoryFN<FormCheckProps> = (args: FormCheckProps) => (
  <FormCheck {...args} />
)

Checkbox.args = {
  htmlFor: 'checkbox-example',
  label: 'Checkbox label'
}

export const Radio: StoryFN<FormCheckProps> = (args: FormCheckProps) => (
  <FormCheck {...args} />
)

Radio.args = {
  htmlFor: 'radio-example',
  label: 'Radio label',
  type: 'radio'
}

export const Switch: StoryFN<FormCheckProps> = (args: FormCheckProps) => (
  <FormCheck {...args} />
)

Switch.args = {
  htmlFor: 'switch-example',
  label: 'Switch checkbox input label',
  switch: true
}

export const ToggleButton: StoryFN<FormCheckProps> = (args: FormCheckProps) => (
  <FormCheck {...args} />
)

ToggleButton.args = {
  btn: 'primary',
  htmlFor: 'toggle-btn-example',
  label: 'Toggle button',
  size: 'sm'
}
