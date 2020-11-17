import { PRODUCTS } from '@system-mocks/utils'
import { SearchTemplate, SearchTemplateProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'

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
  results: PRODUCTS
}
