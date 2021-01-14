import { Input } from './Input'
import { InputProps } from './Input.props'

/**
 * @file Stories - Input
 * @module lib/atoms/Input/stories
 */

export default {
  argTypes: {
    type: {
      control: {
        options: [
          'button',
          'checkbox',
          'color',
          'date',
          'datetime-local',
          'email',
          'file',
          'hidden',
          'image',
          'month',
          'number',
          'password',
          'radio',
          'range',
          'reset',
          'search',
          'submit',
          'tel',
          'text',
          'time',
          'url',
          'week'
        ],
        type: 'select'
      }
    }
  },
  component: Input,
  parameters: {
    jest: ['Input']
  },
  title: 'Library/Atoms/Input'
}

export const Default: FCS<InputProps> = args => <Input {...args} />

Default.args = {
  'aria-label': 'Dummy input',
  placeholder: 'Placeholder text'
}

export const Checkbox: FCS<InputProps> = args => <Input {...args} />

Checkbox.args = {
  type: 'checkbox'
}

export const Email: FCS<InputProps> = args => <Input {...args} />

Email.args = {
  placeholder: 'you@email.com',
  type: 'email'
}

export const Radio: FCS<InputProps> = args => <Input {...args} />

Radio.args = {
  type: 'radio'
}
