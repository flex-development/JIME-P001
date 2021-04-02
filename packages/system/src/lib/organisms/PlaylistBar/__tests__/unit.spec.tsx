import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import StoryMeta, { Default } from '../PlaylistBar.stories'

/**
 * @file Unit Tests - PlaylistBar
 * @module lib/organisms/PlaylistBar/tests/unit
 */

describe('unit:PlaylistBar', () => {
  const args = { ...Default.args, songs: StoryMeta.args.songs }

  describe('html', () => {
    it('renders <section> element with class "playlist-bar"', () => {
      const { container } = render(<Default {...args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('section')
      expect(container.firstChild).toHaveClass('playlist-bar')
    })
  })

  describe('props', () => {
    describe('auto', () => {
      const spy = jest.spyOn(window.HTMLMediaElement.prototype, 'play')

      beforeEach(() => {
        spy.mockClear()
      })

      it('when false: does not begin playback', async () => {
        render(<Default {...args} auto={false} />)

        await waitFor(() => {
          expect(spy).not.toBeCalled()
        })
      })

      it('when true: begins playback', async () => {
        render(<Default {...args} />)

        await waitFor(() => {
          expect(spy).toBeCalled()
        })
      })
    })

    describe('curr', () => {
      it('sets first song to play', async () => {
        const curr = args.songs.length - 1
        const song = args.songs[curr]

        render(<Default {...args} curr={curr} />)

        const alt = new RegExp(`artwork for ${song.name}`, 'i')

        await waitFor(() => {
          expect(screen.getByAltText(alt)).toBeInTheDocument()
        })
      })
    })

    describe('songs', () => {
      it('renders with attribute `data-songs`', () => {
        const { container } = render(<Default {...args} />)

        const element = container.firstChild

        expect(element).toHaveAttribute('data-songs', `${args.songs.length}`)
      })
    })
  })

  describe.skip('callbacks', () => {
    it('calls handlePlayback', async () => {
      const handlePlayback = jest.fn()

      render(<Default {...args} handlePlayback={handlePlayback} />)

      // Get playback <button> element
      const button = screen.getByRole('button', { name: /playback/i })

      // Wait for song artwork and audio to load, expect button to be enabled
      await waitFor(() => {
        expect(button).toBeEnabled()
      })

      // ! Mock clicking playback buttons
      fireEvent.click(button)

      // Expect handlePlayback callback to fire
      expect(handlePlayback).toBeCalled()
    })

    it('calls handleSkip', async () => {
      const handleSkip = jest.fn()

      render(<Default {...args} handleSkip={handleSkip} />)

      // Get skip <button> elements
      const button_next = screen.getByRole('button', { name: /next/i })
      const button_prev = screen.getByRole('button', { name: /previous/i })

      // Wait for song artwork and audio to load, expect buttons to be enabled
      await waitFor(() => {
        expect(button_next).toBeEnabled()
        expect(button_prev).toBeEnabled()
      })

      // ! Mock clicking skip buttons
      fireEvent.click(button_next)
      fireEvent.click(button_prev)

      // Expect handleSkip callback to fire
      expect(handleSkip).toBeCalledTimes(2)
    })
  })
})
