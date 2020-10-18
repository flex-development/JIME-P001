import {
  Default,
  Playing
} from '@system/stories/lib/organisms/PlaylistBar.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - PlaylistBar
 * @module tests/lib/organisms/PlaylistBar
 *
 * @todo Test callback functions
 */

it('renders <section class="playlistbar">', () => {
  const { container } = render(<Default {...Default.args} />)

  expect(container.firstChild).toHaveClass('playlistbar')
})

it('renders the song title', () => {
  const { getByText } = render(<Default {...Default.args} />)

  expect(getByText(Default.args.title)).toHaveClass('playlistbar-title')
})

it('renders the song artist(s)', () => {
  const { getByText } = render(<Default {...Default.args} />)

  expect(getByText(Default.args.artistName)).toHaveClass('playlistbar-artist')
})

it('renders the song artwork', () => {
  const { getByAltText } = render(<Default {...Default.args} />)

  // ! Keep in sync with PlaylistBar implementation
  const alt = `Artwork for ${Default.args.title}`

  expect(getByAltText(alt)).toBeInTheDocument()
})

it('renders a play icon in the playback button if props.playback_state !== "playing"', () => {
  const { getByText } = render(<Default {...Default.args} />)

  // ! Keep in sync with PlaylistBar implementation
  expect(getByText('play_circle_outline')).toBeInTheDocument()
})

it('renders a pause icon in the playback button if props.playback_state === "paused"', () => {
  const { getByText } = render(<Playing {...Playing.args} />)

  // ! Keep in sync with PlaylistBar implementation
  expect(getByText('pause_circle_outline')).toBeInTheDocument()
})
