import { LabeledFormControl, LabeledFormControlProps } from '@system/components'
import { StoryFN } from '@system/types'
import product_options from '@system/__mocks__/product-options.mock.json'
import React from 'react'

/**
 * @file Stories -  LabeledFormControl
 * @module stories/lib/molecules/LabeledFormControl
 */

export default {
  component: LabeledFormControl,
  parameters: {
    jest: ['LabeledFormControl']
  },
  title: 'Library/Molecules/LabeledFormControl'
}

export const Email: StoryFN<LabeledFormControlProps> = (
  args: LabeledFormControlProps
) => <LabeledFormControl {...args} />

Email.args = {
  children: 'Email address',
  control: {
    name: 'email',
    type: 'email'
  }
}

export const ProductVariant: StoryFN<LabeledFormControlProps> = (
  args: LabeledFormControlProps
) => <LabeledFormControl {...args} />

ProductVariant.args = {
  children: 'Product Variant',
  control: {
    name: 'variant',
    options: product_options,
    placeholder: 'Select a product variant'
  },
  name: 'select'
}

export const Quantity: StoryFN<LabeledFormControlProps> = (
  args: LabeledFormControlProps
) => <LabeledFormControl {...args} />

Quantity.args = {
  children: 'Quanity',
  control: {
    defaultValue: 1,
    name: 'quantity',
    type: 'number'
  }
}

export const ReviewBody: StoryFN<LabeledFormControlProps> = (
  args: LabeledFormControlProps
) => <LabeledFormControl {...args} />

ReviewBody.args = {
  children: 'Review Body',
  control: {
    name: 'body',
    placeholder:
      'Blue bottle single-origin coffee next level taxidermy four loko seitan cupidatat flannel. Cred asymmetrical literally vexillologist cliche do distillery hashtag raw denim crucifix everyday carry affogato austin. Williamsburg jean shorts raclette, aesthetic quinoa dolore hammock echo park taxidermy messenger bag.'
  },
  name: 'textarea'
}
