import { form_control_size as size, input_type as type } from '@system/config'
import { StoryFN } from '@system/types/storybook'
import { Input, InputProps } from './Input'

/**
 * @file Stories - Input
 * @module components/atoms/Input/stories
 */

export default {
  argTypes: { size, type },
  component: Input,
  parameters: {
    jest: ['Input']
  },
  title: 'Library/Atoms/Input'
}

/**
 * Default {@link Input} story.
 */
export const Default: StoryFN<InputProps> = (args: InputProps) => (
  <Input {...args} />
)

Default.args = {
  placeholder: 'Placeholder text'
}

/**
 * Checkbox {@link Input} story.
 */
export const Checkbox: StoryFN<InputProps> = (args: InputProps) => (
  <Input {...args} />
)

Checkbox.args = {
  type: 'checkbox'
}

/**
 * Email {@link Input} story.
 */
export const Email: StoryFN<InputProps> = (args: InputProps) => (
  <Input {...args} />
)

Email.args = {
  placeholder: 'you@email.com',
  type: 'email'
}

/**
 * Radio {@link Input} story.
 */
export const Radio: StoryFN<InputProps> = (args: InputProps) => (
  <Input {...args} />
)

Radio.args = {
  type: 'radio'
}
