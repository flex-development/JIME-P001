import { Input, TextArea } from '@system/lib/atoms'
import { Email as EmailInput } from '@system/lib/atoms/Input/Input.stories'
import { ProductVariants } from '@system/lib/atoms/Select/Select.stories'
import { FormField } from './FormField'
import type { FormFieldProps } from './FormField.props'

/**
 * @file Stories -  FormField
 * @module lib/molecules/FormField/stories
 */

export default {
  component: FormField,
  parameters: {
    jest: ['FormField']
  },
  title: 'Library/Molecules/FormField'
}

export const Email: FCS<FormFieldProps> = args => <FormField {...args} />

Email.args = {
  children: <EmailInput {...EmailInput.args} />,
  'data-control': 'input',
  'data-type': 'email',
  label: 'Email address'
}

export const ProductVariant: FCS<FormFieldProps> = args => (
  <FormField {...args} />
)

ProductVariant.args = {
  children: <ProductVariants {...ProductVariants.args} />,
  'data-control': 'select',
  label: 'Product Variant'
}

export const Quantity: FCS<FormFieldProps> = args => <FormField {...args} />

Quantity.args = {
  children: <Input defaultValue={1} type='number' />,
  'data-control': 'input',
  'data-type': 'number',
  label: 'Quanity'
}

export const ReviewBody: FCS<FormFieldProps> = args => <FormField {...args} />

ReviewBody.args = {
  children: (
    <TextArea
      name='body'
      placeholder='Blue bottle single-origin coffee next level taxidermy four loko seitan cupidatat flannel. Cred asymmetrical literally vexillologist cliche do distillery hashtag raw denim crucifix everyday carry affogato austin. Williamsburg jean shorts raclette, aesthetic quinoa dolore hammock echo park taxidermy messenger bag.'
    />
  ),
  'data-control': 'textarea',
  label: 'Review Body'
}
