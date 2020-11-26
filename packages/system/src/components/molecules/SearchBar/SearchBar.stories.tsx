import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { SearchBar, SearchBarProps } from './SearchBar'

/**
 * @file Stories - SearchBar
 * @module components/molecules/SearchBar/stories
 */

export default {
  component: SearchBar,
  parameters: {
    jest: ['SearchBar']
  },
  title: 'Library/Molecules/SearchBar'
}

export const Default: StoryFN<SearchBarProps> = (args: SearchBarProps) => (
  <SearchBar {...args} />
)

Default.args = {}

export const InitialQuery: StoryFN<SearchBarProps> = (args: SearchBarProps) => (
  <SearchBar {...args} />
)

InitialQuery.args = {
  query: 'rolling trays'
}
