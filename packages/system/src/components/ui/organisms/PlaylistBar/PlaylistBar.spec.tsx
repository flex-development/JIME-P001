import { render } from '@testing-library/react'
import { Default, Playing } from './PlaylistBar.stories'

/**
 * @file Tests - PlaylistBar
 * @module components/ui/organisms/PlaylistBar/spec
 */

it('renders <section class="playlistbar">', () => {
  const { container } = render(<Default {...Default.args} />)

  expect(container.firstChild).toHaveClass('playlistbar')
})

it('renders the song title', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { name } = Default.args.song

  expect(getByText(name)).toHaveClass('playlistbar-song')
})

it('renders the song artist(s)', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { artistName } = Default.args.song

  expect(getByText(artistName)).toHaveClass('playlistbar-artist')
})

it('renders the song artwork', () => {
  const { getByAltText } = render(<Default {...Default.args} />)
  const { name } = Default.args.song

  // ! Keep in sync with PlaylistBar implementation
  expect(getByAltText(`Artwork for ${name}`)).toBeInTheDocument()
})

it('renders play icon in the playback button if props.playback !== "playing"', () => {
  const { getByText } = render(<Default {...Default.args} />)

  // ! Keep in sync with PlaylistBar implementation
  expect(getByText('play_circle_outline')).toBeInTheDocument()
})

it('renders pause icon in the playback button if props.playback === "paused"', () => {
  const { getByText } = render(<Playing {...Playing.args} />)

  // ! Keep in sync with PlaylistBar implementation
  expect(getByText('pause_circle_outline')).toBeInTheDocument()
})
