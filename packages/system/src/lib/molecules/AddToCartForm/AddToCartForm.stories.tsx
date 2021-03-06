import type { IProductListing } from '@kustomzcore/types'
import { PRODUCTS } from '@tests/system/__mocks__/utils'
import { AddToCartForm } from './AddToCartForm'
import type { AddToCartFormProps } from './AddToCartForm.props'

/**
 * @file Stories - AddToCartForm
 * @module lib/molecules/AddToCartForm/stories
 */

export default {
  args: {
    style: {
      maxWidth: '1362px'
    }
  },
  component: AddToCartForm,
  parameters: {
    jest: ['AddToCartForm']
  },
  title: 'Library/Molecules/AddToCartForm'
}

export const AshTray: FCS<AddToCartFormProps> = args => (
  <AddToCartForm {...args} />
)

AshTray.args = {
  product: PRODUCTS.find(p => p.handle === 'ash-tray') as IProductListing
}

export const Kustomz: FCS<AddToCartFormProps> = args => (
  <AddToCartForm {...args} />
)

Kustomz.storyName = 'KUSTOMZ'
Kustomz.args = {
  product: PRODUCTS.find(p => p.handle === 'kustomz') as IProductListing
}

export const RollingTray: FCS<AddToCartFormProps> = args => (
  <AddToCartForm {...args} />
)

RollingTray.args = {
  product: PRODUCTS.find(p => p.handle === 'rolling-tray') as IProductListing
}
