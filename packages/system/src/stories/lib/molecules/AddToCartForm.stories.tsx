import { AddToCartForm, AddToCartFormProps } from '@system/components'
import { ProductResource, StoryFN } from '@system/types'
import products from '@system/__mocks__/products.mock.json'
import React from 'react'

/**
 * @file Stories - AddToCartForm
 * @module stories/lib/molecules/AddToCartForm
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

export const AshTray: StoryFN<AddToCartFormProps> = (
  args: AddToCartFormProps
) => <AddToCartForm {...args} />

AshTray.args = {
  product: products.find(p => p.handle === 'ash-tray') as ProductResource
}

export const Kustomz: StoryFN<AddToCartFormProps> = (
  args: AddToCartFormProps
) => <AddToCartForm {...args} />

Kustomz.storyName = 'KUSTOMZ'
Kustomz.args = {
  product: products.find(p => p.handle === 'kustomz') as ProductResource
}

export const RollingTray: StoryFN<AddToCartFormProps> = (
  args: AddToCartFormProps
) => <AddToCartForm {...args} />

RollingTray.args = {
  product: products.find(p => p.handle === 'rolling-tray') as ProductResource
}
