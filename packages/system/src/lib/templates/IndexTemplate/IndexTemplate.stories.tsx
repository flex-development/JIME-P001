import { OBJECTS as REVIEWS } from '@kapi/tests/fixtures/judgeme/reviews'
import PAGE from '@system/tests/fixtures/api/pages'
import PRODUCTS from '@system/tests/fixtures/api/products'
import { IndexTemplate } from './IndexTemplate'
import type { IndexTemplateProps } from './IndexTemplate.props'

/**
 * @file Stories - IndexTemplate
 * @module lib/templates/IndexTemplate/stories
 */

export default {
  args: {
    style: {
      maxWidth: '1410px'
    }
  },
  component: IndexTemplate,
  parameters: {
    jest: ['IndexTemplate']
  },
  title: 'Library/Templates/IndexTemplate'
}

export const Homepage: FCS<IndexTemplateProps> = args => (
  <IndexTemplate {...args} />
)

Homepage.args = {
  page: PAGE,
  products: PRODUCTS,
  reviews: REVIEWS
}
