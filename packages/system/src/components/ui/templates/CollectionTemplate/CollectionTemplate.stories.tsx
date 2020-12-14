import collections from '@system-mocks/data/collection-listings.mock.json'
import { PRODUCTS } from '@system-mocks/utils'
import { StoryFN } from '@system/types/storybook'
import { ICollectionListing } from 'shopify-api-node'
import {
  CollectionTemplate,
  CollectionTemplateProps
} from './CollectionTemplate'

/**
 * @file Stories - CollectionTemplate
 * @module components/ui/templates/CollectionTemplate/stories
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