import { ANYTHING } from '@flex-development/json/utils/types'
import { MusicKitSongAttributes } from '@flex-development/kustomzcore/types'
import { SectionProps } from '@system/lib/atoms/Section'
import { EventHandlers } from '@system/types'

/**
 * @file Component Props - PlaylistBar
 * @module lib/organisms/PlaylistBar/props
 */

export interface PlaylistBarProps extends SectionProps {
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
  songs?: MusicKitSongAttributes[]
}
