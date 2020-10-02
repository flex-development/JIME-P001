import { CheckoutLineItem, CheckoutLineItemProps } from '@kustomz/lib'
import React from 'react'
import { StoryFN } from '../../../config'

/**
 * @file Stories - CheckoutLineItem
 * @module stories/lib/molecules/CheckoutLineItem
 */

export default {
  component: CheckoutLineItem,
  excludeStories: ['AshTrayData', 'KustomzData', 'RollingTrayData'],
  parameters: {
    jest: ['CheckoutLineItem']
  },
  title: 'Library/Molecules/CheckoutLineItem'
}

export const AshTray: StoryFN<CheckoutLineItemProps> = (
  args: CheckoutLineItemProps
) => <CheckoutLineItem {...args} />

AshTray.args = {
  customAttributes: [],
  formattedPrice: '$10.00',
  image: {
    alt: null,
    id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTkzOTcyMTgyMDU4NTE=',
    src: 'https://cdn.shopify.com/s/files/1/0470/4790/1339/products/ash-tray-funfetti.jpg?v=1601392495'
  },
  productTitle: 'Ash Tray',
  quantity: 1,
  style: {
    maxWidth: '1362px'
  },
  title: 'FUNFETTI',
  variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU2NjQ2MzkwOTA4NDM='
}

export const Kustomz: StoryFN<CheckoutLineItemProps> = (
  args: CheckoutLineItemProps
) => <CheckoutLineItem {...args} />

Kustomz.storyName = 'KUSTOMZ'
Kustomz.args = {
  customAttributes: [
    {
      key: 'kpd',
      value: 'Organic kogi fixie, art party cray viral ex la croix marfa fashion axe bushwick flannel lo-fi sunt. Fugiat affogato sint, esse et normcore mustache craft beer ramps DIY.'
    }
  ],
  formattedPrice: '$35.00',
  image: {
    alt: null,
    id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTkzOTcyMTgyMDU4NTE=',
    src: 'https://cdn.shopify.com/s/files/1/0470/4790/1339/products/kustomz_23be575c-354d-4c08-98c7-eb5b07413198.jpg?v=1601404585'
  },
  productTitle: 'KUSTOMZ',
  quantity: 1,
  style: {
    maxWidth: '1362px'
  },
  title: 'Rolling Tray',
  variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjIwMDY4MzE3NjA5MQ=='
}
