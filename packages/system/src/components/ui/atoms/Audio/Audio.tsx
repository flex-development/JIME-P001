import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedProps } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'

/**
 * @file Render an `<audio>` element
 * @module components/ui/atoms/Audio/impl
 */

export interface AudioProps extends MutatedProps<HTMLAudioElement> {
  /**
   * If specified, the audio will automatically begin playback as soon as it can
   * do so, without waiting for the entire audio file to finish downloading.
   */
  autoPlay?: boolean

  /**
   * If true, show controls to allow the user to control audio playback,
   * including volume, seeking, and pause/resume playback.
   *
   * @default true
   */
  controls?: boolean

  /**
   * Indicates whether to use CORS to fetch the related audio file.
   *
   * CORS-enabled resources can be reused in the `<canvas>` element without
   * being tainted.
   */
  crossorigin?: 'anonymous' | 'use-credentials'

  /**
   * Sets the current playback position to the given time and seeks the media to
   * that position if the media is currently loaded.
   */
  currentTime?: number | string

  /**
   * If true, disable the capability of remote playback in devices that are
   * attached using wired (HDMI, DVI, etc.) and wireless technologies (Miracast,
   * Chromecast, DLNA, AirPlay, etc).
   *
   * In Safari, you can use `x-webkit-airplay="deny"` as a fallback
   */
  disableRemotePlayback?: boolean

  /**
   * Double-precision floating-point value that indicates the total length of
   * the audio track in seconds.
   */
  duration?: number | string

  /**
   * If true, the audio player will automatically seek back to the start upon
   * reaching the end of the audio.
   */
  loop?: boolean

  /**
   * Indicates whether the audio will be initially silenced.
   */
  muted?: boolean

  /**
   * Provides a hint to the browser about what the author thinks will lead to
   * the best user experience.
   *
   * Possible values are:
   *
   * - `auto`: entire audio file can be downloaded
   * - `metadata`: only audio metadata (e.g. length) is fetched
   * - `none`: audio should not be preloaded
   *
   * @default 'metadata'
   */
  preload?: '' | 'auto' | 'metadata' | 'none'

  /**
   * The URL of the audio to embed. If omitted, `<source>` elements can be used
   * within the `<audio>` component to specify the audio to embed.
   *
   * If not omitted, this value is subject to HTTP access controls.
   */
  src?: string
}

/**
 * Renders an `<audio>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/audio
 * - https://developer.mozilla.org/docs/Web/API/HTMLAudioElement
 */
export const Audio: FREC<AudioProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<typeof props, AnimatedFREC<'audio'>>(
    props
  )

  return <animated.audio {...sanitized} ref={ref} />
})

Audio.displayName = 'Audio'

Audio.defaultProps = {
  controls: true,
  preload: 'metadata'
}
