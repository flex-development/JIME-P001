import type { ANYTHING } from '@flex-development/json'
import type { SongAttributes } from '@kustomzcore/types'
import type { SectionProps } from '@system/lib/atoms/Section'
import type { EventHandlers } from '@system/types'

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
   * If a song is playing, the value will be 'playing', otherwise it will be
   * 'paused'.
   */
  handlePlayback?(event: EventHandlers.Click.Button): ANYTHING

  /**
   * Skip button handler.
   *
   * This function will be fired when the `to-previous-song` or `to-next-song`
   * button is clicked. The name of the button clicked can be found by evaluting
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
