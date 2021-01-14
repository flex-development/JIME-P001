import { useSpring } from '@react-spring/web'
import {
  PaginationEndMinor,
  PaginationStartMinor,
  PauseCircleMajor,
  PlayCircleMajor
} from '@shopify/polaris-icons'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { useSongs } from '@system/hooks/useSongs'
import { Audio } from '@system/lib/atoms/Audio'
import { Box } from '@system/lib/atoms/Box'
import { Button } from '@system/lib/atoms/Button'
import { Image } from '@system/lib/atoms/Image'
import { Link } from '@system/lib/atoms/Link'
import { Paragraph } from '@system/lib/atoms/Paragraph'
import { Section, SectionProps } from '@system/lib/atoms/Section'
import { EventHandlers } from '@system/types'
import { getSongArtworkURL } from '@system/utils/getSongArtworkURL'
import isFunction from 'lodash/isFunction'
import { FC, useCallback, useMemo } from 'react'
import useAudio from 'react-use/useAudio'
import useEvent from 'react-use/useEvent'
import { PlaylistBarProps } from './PlaylistBar.props'

/**
 * @file Implementation - PlaylistBar
 * @module lib/organisms/PlaylistBar/impl
 */

/**
 * Audio player for the shop playlist. Users can pause the playlist, as well
 * skip forward or backward.
 *
 * Renders a `Section` component with the class `playlist-bar`.
 *
 * - https://github.com/wsmd/musickit-typescript
 */
export const PlaylistBar: FC<PlaylistBarProps> = props => {
  const { auto, curr, handlePlayback, handleSkip, songs = [], ...rest } = props

  // Handle tracks state
  const { next, previous, song } = useSongs(songs, curr)

  // Get song artwork URL
  const artwork_url = useMemo<string>(() => getSongArtworkURL(song), [song])

  // Get <audio> src URL
  const audio_src = song.previews?.[0]?.url

  // Get reference to <audio> element and control <audio> actions
  const [audio, audio_state, , audio_ref] = useAudio(
    <Audio autoPlay={auto} hidden preload='auto' src={audio_src} />
  )

  /**
   * Returns true if audio is ready to play.
   */
  const isAudioReady = () => {
    return (audio_ref.current?.readyState ?? -1) > 0
  }

  /* Callback version of `isAudioReady` */
  const isAudioReadyCB = useCallback(isAudioReady, [audio_ref])

  // Animate ready state
  const style = useSpring({ opacity: isAudioReadyCB() ? 1 : 0 })

  // Get component props
  const sanitized = useSanitizedProps<'section', SectionProps>(
    rest,
    'playlist-bar'
  )

  /**
   * Pauses or plays the current song.
   *
   * @param event - `<button>` click event
   */
  const onClickPlayback = (event: EventHandlers.Click.Button) => {
    event.preventDefault()

    if (isFunction(handlePlayback)) handlePlayback(event)

    if (event.target.value === 'pause') return audio_ref.current?.play()
    return audio_ref.current?.pause()
  }

  /* Callback version of `onClickPlayback` */
  const onClickPlaybackCB = useCallback(onClickPlayback, [
    audio_ref,
    handlePlayback
  ])

  /**
   * Handles skipping backward or forward in the playlist.
   *
   * @param event - `<button>` click event
   */
  const onClickSkip = (event: EventHandlers.Click.Button) => {
    event.preventDefault()

    if (isFunction(handleSkip)) handleSkip(event)
    return event.target.name === 'skip_previous' ? previous() : next()
  }

  /* Callback version of `onClickSkip` */
  const onClickSkipCB = useCallback(onClickSkip, [handleSkip, next, previous])

  // Update active song index when current song changes
  useEvent('ended', next, audio_ref.current)

  return (
    <Section {...sanitized}>
      <Box className='playlist-bar-col' style={style}>
        <Link
          className='playlist-bar-artwork'
          href={artwork_url}
          target='_blank'
        >
          <Image
            alt={`Artwork for ${song.name}`}
            loading='eager'
            height={song.artwork?.height}
            src={artwork_url}
            width={song.artwork?.width}
          />
        </Link>
        <Box className='playlist-bar-media-details'>
          <Paragraph className='playlist-bar-song'>{song.name}</Paragraph>
          <Paragraph className='playlist-bar-artist'>
            {song.artistName}
          </Paragraph>
        </Box>
      </Box>

      <Box className='playlist-bar-col'>
        <Button
          $variant='ghost'
          className='playlist-bar-control-skip'
          disabled={!isAudioReadyCB()}
          name='skip_previous'
          onClick={onClickSkipCB}
        >
          <PaginationStartMinor className='icon' />
        </Button>
        <Button
          $variant='ghost'
          className='playlist-bar-control-playback'
          disabled={!isAudioReadyCB()}
          onClick={onClickPlaybackCB}
          name='playback'
          value={audio_state.paused ? 'pause' : 'play'}
        >
          {(() => {
            if (audio_state.paused) return <PlayCircleMajor className='icon' />
            return <PauseCircleMajor className='icon' />
          })()}
        </Button>
        <Button
          $variant='ghost'
          className='playlist-bar-control-skip'
          disabled={!isAudioReadyCB()}
          name='skip_next'
          onClick={onClickSkipCB}
        >
          <PaginationEndMinor className='icon' />
        </Button>
      </Box>

      {audio}
    </Section>
  )
}

PlaylistBar.displayName = 'PlaylistBar'

PlaylistBar.defaultProps = {
  auto: true,
  songs: []
}
