import SONGS from '@system-mocks/data/song-attributes.mock.json'
import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { PlaylistBar, PlaylistBarProps } from './PlaylistBar'

/**
 * @file Stories - PlaylistBar
 * @module components/organisms/PlaylistBar/stories
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
