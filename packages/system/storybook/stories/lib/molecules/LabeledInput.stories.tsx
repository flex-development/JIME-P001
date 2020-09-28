import { LabeledInput, LabeledInputProps } from '@kustomz/lib'
import React from 'react'
import { form_control_size as size, StoryFN } from '../../../config'

/**
 * @file Stories - LabeledInput
 * @module stories/lib/molecules/LabeledInput
 */

export default {
  argTypes: { size },
  component: LabeledInput,
  parameters: {
    jest: ['LabeledInput']
  },
  title: 'Library/Molecules/LabeledInput'
}

export const Quantity: StoryFN<LabeledInputProps> = (
  args: LabeledInputProps
) => <LabeledInput {...args} />

Quantity.args = {
  children: 'Quanity',
  input: {
    defaultValue: 1,
    name: 'quantity',
    type: 'number'
  }
}
