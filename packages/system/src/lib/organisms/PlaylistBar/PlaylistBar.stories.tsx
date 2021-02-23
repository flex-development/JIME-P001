import { SONGS } from '@tests/system/__mocks__/utils'
import type { PlaylistBarProps } from '././PlaylistBar.props'
import { PlaylistBar } from './PlaylistBar'

/**
 * @file Stories - PlaylistBar
 * @module lib/organisms/PlaylistBar/stories
 */

export default {
  args: {
    songs: SONGS
  },
  component: PlaylistBar,
  parameters: {
    jest: ['PlaylistBar']
  },
  title: 'Library/Organisms/PlaylistBar'
}

export const Default: FCS<PlaylistBarProps> = args => <PlaylistBar {...args} />

Default.args = {}
