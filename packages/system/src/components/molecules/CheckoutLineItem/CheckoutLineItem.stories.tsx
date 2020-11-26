import items from '@app-mocks/data/checkout-line-items.mock.json'
import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { CheckoutLineItem, CheckoutLineItemProps } from './CheckoutLineItem'

/**
 * @file Stories - CheckoutLineItem
 * @module components/molecules/CheckoutLineItem/stories
 */

export default {
  args: {
    style: {
      maxWidth: '1362px'
    }
  },
  component: CheckoutLineItem,
  parameters: {
    jest: ['CheckoutLineItem']
  },
  title: 'Library/Molecules/CheckoutLineItem'
}

export const AshTray: StoryFN<CheckoutLineItemProps> = (
  args: CheckoutLineItemProps
) => <CheckoutLineItem {...args} />

AshTray.args = Object.assign({}, items[0])

export const Kustomz: StoryFN<CheckoutLineItemProps> = (
  args: CheckoutLineItemProps
) => <CheckoutLineItem {...args} />

Kustomz.storyName = 'KUSTOMZ'
Kustomz.args = Object.assign({}, items[1] as CheckoutLineItemProps)
