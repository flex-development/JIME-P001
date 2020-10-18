import { CheckoutLineItem, CheckoutLineItemProps } from '@system/lib'
import { StoryFN } from '@system/types'
import items from '@system/__mocks__/items.mock.json'
import React from 'react'

/**
 * @file Stories - CheckoutLineItem
 * @module stories/lib/molecules/CheckoutLineItem
 */

export default {
  component: CheckoutLineItem,
  parameters: {
    jest: ['CheckoutLineItem']
  },
  title: 'Library/Molecules/CheckoutLineItem'
}

export const AshTray: StoryFN<CheckoutLineItemProps> = (
  args: CheckoutLineItemProps
) => <CheckoutLineItem {...args} />

AshTray.args = {
  ...Object.assign({}, items[0] as CheckoutLineItemProps),
  style: {
    maxWidth: '1362px'
  }
}

export const Kustomz: StoryFN<CheckoutLineItemProps> = (
  args: CheckoutLineItemProps
) => <CheckoutLineItem {...args} />

Kustomz.storyName = 'KUSTOMZ'
Kustomz.args = {
  ...Object.assign({}, items[1] as CheckoutLineItemProps),
  style: {
    maxWidth: '1362px'
  }
}