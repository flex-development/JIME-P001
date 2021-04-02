import LAYOUT_DATA from '@system/tests/fixtures/api/layout'
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
  src: LAYOUT_DATA.playlist.tracks[0].previews[0].url
}
