import { PRODUCTS } from '@system-mocks/utils'
import { StoryFN } from '@system/types/storybook'
import { SearchTemplate, SearchTemplateProps } from './SearchTemplate'

/**
 * @file Stories - SearchTemplate
 * @module components/templates/SearchTemplate/stories
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
