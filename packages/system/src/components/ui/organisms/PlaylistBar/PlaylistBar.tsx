import { ANYTHING } from '@flex-development/json'
import { MusicKitSongAttributes as SongAttributes } from '@flex-development/kustomzcore'
import {
  Audio,
  Button,
  Column,
  FlexBox,
  Image,
  Link,
  Paragraph,
  Row,
  Section
} from '@system/components/ui/atoms'
import { useSanitizedProps, useSongs } from '@system/hooks'
import { EventHandlers, MutatedProps } from '@system/types'
import { getSongArtworkURL } from '@system/utils'
import { isFunction } from 'lodash'
import { FC, useCallback, useMemo } from 'react'
import { useSpring } from 'react-spring'
import { useAudio, useEvent } from 'react-use'

/**
 * @file Display an Apple Music playlist stream
 * @module components/ui/organisms/PlaylistBar/impl
 */

export interface PlaylistBarProps extends MutatedProps {
  /**
   * If true, begin playback immediately.
   *
   * @default true
   */
  auto?: boolean

  /**
   * Index of the song currently playing.
   */
  curr?: number

  /**
   * Playback button handler.
   *
   * The playback state can be accessed by evaluating `event.target.value`.
   * If a song is playing, the value will be 'play', otherwise it will be
   * 'pause'.
   */
  handlePlayback?(event: EventHandlers.Click.Button): ANYTHING

  /**
   * Skip button handler.
   *
   * This function will be fired when the `skip_previous` or `skip_next` button
   * is clicked. The name of the button clicked can be found by evaluting
   * `event.target.name`.
   */
  handleSkip?(event: EventHandlers.Click.Button): ANYTHING

  /**
   * Array of song attributes.
   *
   * @default []
   */
  songs?: SongAttributes[]
}

/**
 * Audio player for the shop playlist. Users can pause the playlist, as well
 * skip forward or backward.
 *
 * Renders a `Section` component with the class `playlistbar`.
 *
 * - https://github.com/wsmd/musickit-typescript
 */
export const PlaylistBar: FC<PlaylistBarProps> = (props: PlaylistBarProps) => {
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

  // Animate ready state
  const style = useSpring({
    opacity: (audio_ref.current?.readyState ?? -1) > 0 ? 1 : 0
  })

  // Get component props
  const sanitized = useSanitizedProps<typeof rest>(rest, 'playlistbar')

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
      <Row className='pl-0-first pr-0-last w-100' max={2}>
        <Column align='center' flex style={style}>
          <Link
            className='playlistbar-artwork'
            href={artwork_url}
            target='_blank'
          >
            <Image
              alt={`Artwork for ${song.name}`}
              fluid
              height={song.artwork?.height}
              src={artwork_url}
              width={song.artwork?.width}
            />
          </Link>
          <FlexBox direction='column'>
            <Paragraph className='playlistbar-song'>{song.name}</Paragraph>
            <Paragraph className='playlistbar-artist'>
              {song.artistName}
            </Paragraph>
          </FlexBox>
        </Column>

        <Column align='center' flex justify='end'>
          <Button
            className='playlistbar-control-skip'
            icon={{ bi: 'skip-backward-fill' }}
            name='skip_previous'
            onClick={onClickSkipCB}
            variant='ghost'
          />
          <Button
            className='playlistbar-control-playback'
            icon={{ bi: audio_state.paused ? 'play-circle' : 'pause-circle' }}
            onClick={onClickPlaybackCB}
            name='playback'
            value={audio_state.paused ? 'pause' : 'play'}
            variant='ghost'
          />
          <Button
            className='playlistbar-control-skip'
            icon={{ bi: 'skip-forward-fill' }}
            name='skip_next'
            onClick={onClickSkipCB}
            variant='ghost'
          />
        </Column>
      </Row>

      {audio}
    </Section>
  )
}

PlaylistBar.displayName = 'PlaylistBar'

PlaylistBar.defaultProps = {
  auto: true,
  songs: []
}
