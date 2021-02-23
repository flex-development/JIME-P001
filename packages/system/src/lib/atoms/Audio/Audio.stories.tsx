import SONGS from '@tests/system/__mocks__/data/song-attributes.mock.json'
import { Audio } from './Audio'
import type { AudioProps } from './Audio.props'

/**
 * @file Stories - Audio
 * @module lib/atoms/Audio/stories
 */

export default {
  component: Audio,
  parameters: {
    jest: ['Audio']
  },
  title: 'Library/Atoms/Audio'
}

export const Default: FCS<AudioProps> = args => <Audio {...args} />

Default.args = {
  src: SONGS[0].previews[0].url
}
