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

export const Disabled: StoryFN<FormCheckProps> = (args: FormCheckProps) => (
  <FormCheck {...args} />
)

Disabled.args = {
  disabed: true,
  label: 'Disabled'
}

export const Checkbox: StoryFN<FormCheckProps> = (args: FormCheckProps) => (
  <FormCheck {...args} />
)

Checkbox.args = {
  label: 'Default checkbox'
}

export const Radio: StoryFN<FormCheckProps> = (args: FormCheckProps) => (
  <FormCheck {...args} />
)

Radio.args = {
  label: 'Default radio'
}

export const Switch: StoryFN<FormCheckProps> = (args: FormCheckProps) => (
  <FormCheck {...args} />
)

Switch.args = {
  label: 'Default switch checkbox input',
  switch: true,
  type: 'checkbox'
}
