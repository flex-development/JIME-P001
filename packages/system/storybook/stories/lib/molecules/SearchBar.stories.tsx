import { StoryFN } from '@kustomz-config/index'
import { SearchBar, SearchBarProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - SearchBar
 * @module stories/lib/molecules/SearchBar
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
