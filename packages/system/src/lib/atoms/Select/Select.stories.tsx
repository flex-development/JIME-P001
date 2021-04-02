import { Option } from '../Option'
import { Select } from './Select'
import type { SelectProps } from './Select.props'
import OPTIONS from './__tests__/__fixtures__/options'
import PRODUCT_OPTIONS from './__tests__/__fixtures__/product-options'

/**
 * @file Stories - Select
 * @module lib/atoms/Select/stories
 */

export default {
  component: Select,
  parameters: {
    jest: ['Select']
  },
  subcomponents: { Option },
  title: 'Library/Atoms/Select'
}

export const Form: FCS<SelectProps> = args => <Select {...args} />

Form.args = {
  $options: OPTIONS
}

export const ProductVariants: FCS<SelectProps> = args => <Select {...args} />

ProductVariants.args = {
  $options: PRODUCT_OPTIONS,
  name: 'variant',
  placeholder: 'Select a product variant'
}
