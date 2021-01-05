import { ICollectionListing } from '@flex-development/kustomzcore'
import collections from '@system-mocks/data/collection-listings.mock.json'
import { PRODUCTS } from '@system-mocks/utils'
import { CollectionTemplate } from './CollectionTemplate'
import { CollectionTemplateProps } from './CollectionTemplate.props'

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
