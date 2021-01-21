import { SONGS } from '@system-mocks/utils'
import { PlaylistBar } from './PlaylistBar'
import type { PlaylistBarProps } from './PlaylistBar.props'

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
