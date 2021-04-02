import COLLECTION from '@system/tests/fixtures/api/collections/all-products'
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

export const AllProducts: FCS<CollectionTemplateProps> = args => (
  <CollectionTemplate {...args} />
)

AllProducts.args = {
  collection: COLLECTION,
  products: COLLECTION.products
}
