import { Label } from './Label'
import { LabelProps } from './Label.props'

/**
 * @file Stories - Label
 * @module lib/atoms/Label/stories
 */

/* eslint-disable jsx-a11y/label-has-associated-control */

export default {
  args: { htmlFor: '#' },
  component: Label,
  parameters: {
    jest: ['Label']
  },
  title: 'Library/Atoms/Label'
}

export const Default: FCS<LabelProps> = args => <Label {...args} />

Default.args = {
  children: 'Label text'
}

export const Form: FCS<LabelProps> = args => <Label {...args} />

Form.args = {
  $form: true,
  children: 'Email address'
}
