import SONGS from '@system-mocks/data/song-attributes.mock.json'
import { StoryFN } from '@system/types/storybook'
import { Audio, AudioProps } from './Audio'

/**
 * @file Stories - Audio
 * @module components/ui/atoms/Audio/stories
 */

export default {
  component: Audio,
  parameters: {
    jest: ['Audio']
  },
  title: 'Library/Atoms/Audio'
}

export const Default: StoryFN<AudioProps> = (args: AudioProps) => (
  <Audio {...args} />
)

Default.args = {
  src: SONGS[0].previews[0].url
}
