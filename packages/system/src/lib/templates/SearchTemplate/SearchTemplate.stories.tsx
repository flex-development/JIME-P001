import PRODUCTS from '@system/tests/fixtures/api/products'
import { SearchTemplate } from './SearchTemplate'
import type { SearchTemplateProps } from './SearchTemplate.props'

/**
 * @file Stories - SearchTemplate
 * @module lib/templates/SearchTemplate/stories
 */

export default {
  args: {
    style: {
      maxWidth: '1410px'
    }
  },
  component: SearchTemplate,
  parameters: {
    jest: ['SearchTemplate']
  },
  title: 'Library/Templates/SearchTemplate'
}

export const Search: FCS<SearchTemplateProps> = args => (
  <SearchTemplate {...args} />
)

Search.args = {
  results: PRODUCTS
}
