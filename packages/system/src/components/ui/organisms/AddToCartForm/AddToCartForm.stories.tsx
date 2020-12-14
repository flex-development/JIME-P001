import { PRODUCTS } from '@system-mocks/utils'
import { StoryFN } from '@system/types/storybook'
import { IProductListing } from 'shopify-api-node'
import { AddToCartForm, AddToCartFormProps } from './AddToCartForm'

/**
 * @file Stories - AddToCartForm
 * @module components/ui/organisms/AddToCartForm/stories
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
  title: 'Library/Organisms/AddToCartForm'
}

export const AshTray: StoryFN<AddToCartFormProps> = (
  args: AddToCartFormProps
) => <AddToCartForm {...args} />

AshTray.args = {
  product: PRODUCTS.find(p => p.handle === 'ash-tray') as IProductListing
}

export const Kustomz: StoryFN<AddToCartFormProps> = (
  args: AddToCartFormProps
) => <AddToCartForm {...args} />

Kustomz.storyName = 'KUSTOMZ'
Kustomz.args = {
  product: PRODUCTS.find(p => p.handle === 'kustomz') as IProductListing
}

export const RollingTray: StoryFN<AddToCartFormProps> = (
  args: AddToCartFormProps
) => <AddToCartForm {...args} />

RollingTray.args = {
  product: PRODUCTS.find(p => p.handle === 'rolling-tray') as IProductListing
}
