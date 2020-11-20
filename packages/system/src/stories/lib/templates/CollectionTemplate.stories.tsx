import collections from '@app-mocks/data/collection-listings.mock.json'
import { PRODUCTS } from '@system-mocks/utils'
import { CollectionTemplate, CollectionTemplateProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { ICollectionListing } from 'shopify-api-node'

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

export const Products: StoryFN<CollectionTemplateProps> = (
  args: CollectionTemplateProps
) => <CollectionTemplate {...args} />

Products.args = {
  ...CollectionTemplate?.defaultProps,
  collection: (collections[0] as unknown) as ICollectionListing,
  products: PRODUCTS
}
