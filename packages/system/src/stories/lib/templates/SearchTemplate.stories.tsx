import products from '@app-tests/__mocks__/data/product-listings.mock.json'
import { SearchTemplate, SearchTemplateProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { IProductListing } from 'shopify-api-node'

/**
 * @file Stories - SearchTemplate
 * @module stories/lib/templates/SearchTemplate
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

export const Search: StoryFN<SearchTemplateProps> = (
  args: SearchTemplateProps
) => <SearchTemplate {...args} />

Search.args = {
  results: (products as unknown) as Array<IProductListing>
}
