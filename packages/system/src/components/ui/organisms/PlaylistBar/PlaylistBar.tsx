import { ANYTHING } from '@flex-development/json'
import {
  MusicKitPlaybackState,
  MusicKitSongAttributes
} from '@flex-development/kustomzcore'
import {
  Button,
  Column,
  FlexBox,
  IconProps,
  Image,
  Link,
  Paragraph,
  Section
} from '@system/components/ui/atoms'
import { useSanitizedProps } from '@system/hooks'
import { EventHandlers, MutatedProps } from '@system/types'
import { isEmpty } from 'lodash'
import { FC } from 'react'

/**
 * @file Display the current song in the shop playlist
 * @module components/ui/organisms/PlaylistBar/impl
 */

export interface PlaylistBarProps extends MutatedProps {
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
  playback?: MusicKitPlaybackState

  /**
   * Attributes of the current song.
   */
  song: MusicKitSongAttributes
}

/**
 * Displays the current song of the shop playlist. Users can pause the playlist,
 * as well skip forward or backward.
 *
 * Renders a `Section` component with the class `playlistbar`.
 *
 * - https://github.com/wsmd/musickit-typescript
 */
export const PlaylistBar: FC<PlaylistBarProps> = (props: PlaylistBarProps) => {
  const {
    handlePlayback = (event: EventHandlers.Click.Button) => {
      event.preventDefault && event.preventDefault()
      console.log(`Playback state: ${event.target.value}`)
    },
    handleSkip = (event: EventHandlers.Click.Button) => {
      event.preventDefault && event.preventDefault()
      console.log(event.target.name)
    },
    playback = 'none',
    song = {} as MusicKitSongAttributes,
    ...rest
  } = props

  const sanitized = useSanitizedProps<typeof rest>(rest, 'playlistbar')

  if (isEmpty(song)) return null

  let artwork_url = song.artwork?.url.replace('{w}', `${song.artwork.width}`)
  artwork_url = artwork_url?.replace('{h}', `${song.artwork.height}`)

  return (
    <Section {...sanitized}>
      <Column align='center' flex span={8}>
        <Link
          className='playlistbar-artwork'
          href={artwork_url}
          target='_blank'
        >
          <Image alt={`Artwork for ${song.name}`} fluid src={artwork_url} />
        </Link>
        <FlexBox direction='column'>
          <Paragraph className='playlistbar-song'>{song.name}</Paragraph>
          <Paragraph className='playlistbar-artist'>
            {song.artistName}
          </Paragraph>
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
            const prefix = playback === 'playing' ? 'pause' : 'play'
            return { children: `${prefix}_circle_outline` }
          })()}
          onClick={handlePlayback}
          name='playback'
          value={playback}
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
  playback: 'none',
  song: {} as MusicKitSongAttributes
}
