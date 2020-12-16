import { SONGS } from '@system-mocks/utils'
import { StoryFN } from '@system/types/storybook'
import { PlaylistBar, PlaylistBarProps } from './PlaylistBar'

/**
 * @file Stories - PlaylistBar
 * @module components/ui/organisms/PlaylistBar/stories
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

export const Default: StoryFN<PlaylistBarProps> = (args: PlaylistBarProps) => (
  <PlaylistBar {...args} />
)

Default.args = {}
