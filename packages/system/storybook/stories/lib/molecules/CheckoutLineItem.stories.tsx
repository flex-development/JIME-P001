import { CheckoutLineItem, CheckoutLineItemProps } from '@kustomz/lib'
import React from 'react'
import items from '../../../../__mocks__/items.mock.json'
import { StoryFN } from '../../../config'

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
