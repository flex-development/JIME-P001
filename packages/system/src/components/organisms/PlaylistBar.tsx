import {
  ANYTHING,
  MusicKitMediaItem,
  MusicKitPlaybackState
} from '@flex-development/types'
import { useMutatedProps } from '@system/hooks'
import { EventHandlers, MutatedProps } from '@system/types'
import React, { FC } from 'react'
import {
  Button,
  Column,
  FlexBox,
  IconProps,
  Image,
  Link,
  Paragraph,
  Section
} from '../atoms'

/**
 * @file Display the current song in the shop playlist
 * @module components/organisms/PlaylistBar
 */

export interface PlaylistBarProps extends MutatedProps {
  /**
   * The artist(s) of the current song.
   */
  artistName: MusicKitMediaItem['artistName']

  /**
   * The artwork image for the current song.
   */
  artworkURL?: MusicKitMediaItem['artworkURL']

  /**
   * Playback button handler.
   *
   * @param event - `click` event from playback button
   */
  handlePlayback?(event: EventHandlers.Click.Button): ANYTHING

  /**
   * Skip button handler. This function will be fired when a the `skip_previous`
   * or `skip_next` button is clicked. The name of the button clicked can be
   * found by evaluting `event.target.name`.
   *
   * @param event - `click` event from skip button
   */
  handleSkip?(event: EventHandlers.Click.Button): ANYTHING

  /**
   * Queue playback state. If `playing`, the playback button will display a
   * pause icon. Otherwise, a play icon will be displayed inside the button.
   *
   * @default 'none'
   */
  playback_state?: MusicKitPlaybackState

  /**
   * The name of the current song.
   */
  title: MusicKitMediaItem['title']
}

/**
 * Displays the current song of the shop playlist. Users can pause the playlist,
 * as well skip forward or backward. Renders a `Section` component with the
 * class `playlistbar`.
 *
 * - https://github.com/wsmd/musickit-typescript
 *
 * **TODO**
 *
 * - Handle playlist playback state
 * - Handle playlist control functions
 */
export const PlaylistBar: FC<PlaylistBarProps> = (props: PlaylistBarProps) => {
  const {
    artistName,
    artworkURL,
    handlePlayback = (event: EventHandlers.Click.Button) => {
      event.preventDefault && event.preventDefault()
      console.log(`Playback state: ${event.target.value}`)
    },
    handleSkip = (event: EventHandlers.Click.Button) => {
      event.preventDefault && event.preventDefault()
      console.log(event.target.name)
    },
    playback_state = 'playing',
    title,
    ...rest
  } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'playlistbar')

  return (
    <Section {...mutated}>
      <Column align='center' flex span={8}>
        <Link className='playlistbar-artwork' href={artworkURL} target='_blank'>
          <Image alt={`Artwork for ${title}`} fluid src={artworkURL} />
        </Link>
        <FlexBox direction='column'>
          <Paragraph className='playlistbar-title'>{title}</Paragraph>
          <Paragraph className='playlistbar-artist'>{artistName}</Paragraph>
        </FlexBox>
      </Column>

      <Column align='center' flex justify='end' span={4}>
        <Button
          className='playlistbar-control-skip'
          icon={{ children: 'skip_previous', outlined: false }}
          name='skip_previous'
          onClick={handleSkip}
          variant='ghost'
        />
        <Button
          className='playlistbar-control-playback'
          icon={((): IconProps => {
            const prefix = playback_state === 'playing' ? 'pause' : 'play'
            return { children: `${prefix}_circle_outline` }
          })()}
          onClick={handlePlayback}
          name='playback'
          value={playback_state}
          variant='ghost'
        />
        <Button
          className='playlistbar-control-skip'
          icon={{ children: 'skip_next', outlined: false }}
          name='skip_next'
          onClick={handleSkip}
          variant='ghost'
        />
      </Column>
    </Section>
  )
}

PlaylistBar.displayName = 'PlaylistBar'

PlaylistBar.defaultProps = {
  playback_state: 'none'
}
