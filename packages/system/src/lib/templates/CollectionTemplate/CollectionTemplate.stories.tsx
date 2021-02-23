import type { ICollectionListing } from '@kustomzcore'
import collections from '@tests/system/__mocks__/data/collection-listings.mock.json'
import { PRODUCTS } from '@tests/system/__mocks__/utils'
import { CollectionTemplate } from './CollectionTemplate'
import type { CollectionTemplateProps } from './CollectionTemplate.props'

/**
 * @file Stories - CollectionTemplate
 * @module lib/templates/CollectionTemplate/stories
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

export const Products: FCS<CollectionTemplateProps> = args => (
  <CollectionTemplate {...args} />
)

Products.args = {
  ...CollectionTemplate?.defaultProps,
  collection: (collections[0] as unknown) as ICollectionListing,
  products: PRODUCTS
}
