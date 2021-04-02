import LAYOUT_DATA from '@system/tests/fixtures/api/layout'
import type { PlaylistBarProps } from '././PlaylistBar.props'
import { PlaylistBar } from './PlaylistBar'

/**
 * @file Stories - PlaylistBar
 * @module lib/organisms/PlaylistBar/stories
 */

export default {
  args: {
    songs: LAYOUT_DATA.playlist.tracks
  },
  component: PlaylistBar,
  parameters: {
    jest: ['PlaylistBar']
  },
  title: 'Library/Organisms/PlaylistBar'
}

export const Default: FCS<PlaylistBarProps> = args => <PlaylistBar {...args} />

Default.args = {}
