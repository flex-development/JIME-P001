import type { AnimatedProps } from '@react-spring/web'
import { useSpring } from '@react-spring/web'
import { IMAGE_PLACEHOLDER_URL } from '@system/config/constants'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { useSongAttributes } from '@system/hooks/useSongAttributes'
import { Audio } from '@system/lib/atoms/Audio'
import type { BoxProps } from '@system/lib/atoms/Box'
import { Box, BoxAnimated } from '@system/lib/atoms/Box'
import { Button } from '@system/lib/atoms/Button'
import { Image } from '@system/lib/atoms/Image'
import { Link } from '@system/lib/atoms/Link'
import { Paragraph } from '@system/lib/atoms/Paragraph'
import type { SectionProps } from '@system/lib/atoms/Section'
import { Section } from '@system/lib/atoms/Section'
import type { EventHandlers } from '@system/types'
import { getSongArtworkURL } from '@system/utils/getSongArtworkURL'
import isFunction from 'lodash/isFunction'
import type { FC } from 'react'
import { useCallback, useMemo } from 'react'
import { useBoolean } from 'react-hanger/array/useBoolean'
import useAudio from 'react-use/useAudio'
import useEvent from 'react-use/useEvent'
import type { PlaylistBarProps } from './PlaylistBar.props'

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
  const { next, previous, song } = useSongAttributes(songs, curr)

  // Get song artwork URL
  const artwork_url = useMemo<string>(() => {
    let url = getSongArtworkURL(song)

    // Replace size identifier
    const size = url.match('/([0-9]+)(x)([0-9]+)(bb.jpeg)')

    if (size?.length) url = url.replace(size[0], '/72x72bb.jpeg')
    return url
  }, [song])

  // Handle artwork image loading state
  const [artworkReady, { setValue: setArtworkReady }] = useBoolean(false)

  // Get <audio> src URL
  const audio_src = song.previews?.[0]?.url

  // Get reference to <audio> element and control <audio> actions
  const [audio, audio_state, , audio_ref] = useAudio(
    <Audio autoPlay={auto} hidden preload='auto' src={audio_src} />
  )

  /**
   * Sets the `artworkReady` state to `false`.
   */
  const onErrorArtworkImg = () => setArtworkReady(false)

  /* Callback version of `onErrorArtworkImg` */
  const onErrorArtworkImgCB = useCallback(onErrorArtworkImg, [setArtworkReady])

  /**
   * Sets the `artworkReady` state to `true`.
   */
  const onLoadArtworkImg = () => setArtworkReady(true)

  /* Callback version of `onLoadArtworkImg` */
  const onLoadArtworkImgCB = useCallback(onLoadArtworkImg, [setArtworkReady])

  /**
   * Returns true if audio is ready to play.
   */
  const isAudioReady = () => {
    return (audio_ref.current?.readyState ?? -1) > 0
  }

  /* Callback version of `isAudioReady` */
  const isAudioReadyCB = useCallback(isAudioReady, [audio_ref])

  // Animate ready state
  const style = useSpring({
    opacity: artworkReady && isAudioReadyCB() ? 1 : 0,
    top: artworkReady && isAudioReadyCB() ? 0 : 150
  }) as AnimatedProps<BoxProps>['style']

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

    if (event.target.value === 'paused') return audio_ref.current?.play()
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
      <Box className='playlist-bar-col'>
        <Link
          className='playlist-bar-artwork'
          data-ready={isAudioReadyCB() || undefined}
          href={isAudioReadyCB() ? artwork_url : IMAGE_PLACEHOLDER_URL}
          target='_blank'
        >
          <Image
            alt={`Artwork for ${song.name}`}
            onError={onErrorArtworkImgCB}
            onLoad={onLoadArtworkImgCB}
            loading='eager'
            height={72}
            src={isAudioReadyCB() ? artwork_url : IMAGE_PLACEHOLDER_URL}
            width={72}
          />
        </Link>
        <BoxAnimated className='playlist-bar-media-details' style={style}>
          <Paragraph className='playlist-bar-song'>{song.name}</Paragraph>
          <Paragraph className='playlist-bar-artist'>
            {song.artistName}
          </Paragraph>
        </BoxAnimated>
      </Box>

      <Box className='playlist-bar-col'>
        <Button
          $variant='ghost'
          aria-label='Play previous song'
          className='playlist-bar-btn'
          disabled={!artworkReady || !isAudioReadyCB()}
          name='to-previous-song'
          onClick={onClickSkipCB}
        />
        <Button
          $variant='ghost'
          aria-label='Toggle audio playback'
          className='playlist-bar-btn'
          disabled={!artworkReady || !isAudioReadyCB()}
          onClick={onClickPlaybackCB}
          name='playback'
          value={!isAudioReadyCB() || audio_state.paused ? 'paused' : 'playing'}
        />
        <Button
          $variant='ghost'
          aria-label='Play next song'
          className='playlist-bar-btn'
          disabled={!artworkReady || !isAudioReadyCB()}
          name='to-next-song'
          onClick={onClickSkipCB}
        />
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
