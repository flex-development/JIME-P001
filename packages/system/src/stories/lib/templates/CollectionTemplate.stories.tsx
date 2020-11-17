import collections from '@app-tests/__mocks__/data/collection-listings.mock.json'
import products from '@app-tests/__mocks__/data/product-listings.mock.json'
import { CollectionTemplate, CollectionTemplateProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { IProductListing } from 'shopify-api-node'

/**
 * @file Stories - CollectionTemplate
 * @module stories/lib/templates/CollectionTemplate
 */

export default {
  args: {
    style: {
      maxWidth: '1410px'
    }
  },
  component: CollectionTemplate,
  parameters: {
    jest: ['CollectionTemplate']
  },
  title: 'Library/Templates/CollectionTemplate'
}

const { body_html, title } = collections[0]

export const Products: StoryFN<CollectionTemplateProps> = (
  args: CollectionTemplateProps
) => <CollectionTemplate {...args} />

Products.args = {
  ...CollectionTemplate?.defaultProps,
  body_html,
  products: (products as unknown) as Array<IProductListing>,
  title
}
