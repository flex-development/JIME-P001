import { SearchBar } from './SearchBar'
import { SearchBarProps } from './SearchBar.props'

/**
 * @file Stories - SearchBar
 * @module lib/molecules/SearchBar/stories
 */

export default {
  component: SearchBar,
  parameters: {
    jest: ['SearchBar']
  },
  title: 'Library/Molecules/SearchBar'
}

export const Default: FCS<SearchBarProps> = args => <SearchBar {...args} />

Default.args = {}

export const InitialQuery: FCS<SearchBarProps> = args => <SearchBar {...args} />

InitialQuery.args = {
  query: 'rolling trays'
}
