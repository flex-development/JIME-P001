import { PlaylistBar, PlaylistBarProps } from '@system/lib'
import { StoryFN } from '@system/types'
import React from 'react'

/**
 * @file Stories - PlaylistBar
 * @module stories/lib/organisms/PlaylistBar
 */

export default {
  component: PlaylistBar,
  parameters: {
    jest: ['PlaylistBar']
  },
  title: 'Library/Organisms/PlaylistBar'
}

export const Default: StoryFN<PlaylistBarProps> = (args: PlaylistBarProps) => (
  <PlaylistBar {...args} />
)

Default.args = {
  artistName: 'Fabolous',
  artworkURL:
    'https://images-na.ssl-images-amazon.com/images/I/814FrdIhipL._SL1425_.jpg',
  title: 'Into You (feat. Ashanti)'
}

export const Playing: StoryFN<PlaylistBarProps> = (args: PlaylistBarProps) => (
  <PlaylistBar {...args} />
)

Playing.args = {
  artistName: 'Fabolous',
  artworkURL:
    'https://images-na.ssl-images-amazon.com/images/I/814FrdIhipL._SL1425_.jpg',
  playback_state: 'playing',
  title: 'Into You (feat. Ashanti)'
}
