import SONGS from '@system-mocks/data/song-attributes.mock.json'
import { PlaylistBar, PlaylistBarProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
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
  song: SONGS[3]
}

export const Playing: StoryFN<PlaylistBarProps> = (args: PlaylistBarProps) => (
  <PlaylistBar {...args} />
)

Playing.args = {
  playback: 'playing',
  song: SONGS[1]
}
