import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import type { AudioProps } from './Audio.props'

/**
 * @file Implementation - Audio
 * @module lib/atoms/Audio/impl
 */

/**
 * Renders an `<audio>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/audio
 * - https://developer.mozilla.org/docs/Web/API/HTMLAudioElement
 */
export const Audio: FREC<AudioProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<'audio'>(props)

  /* eslint-disable-next-line jsx-a11y/media-has-caption */
  return <audio {...sanitized} ref={ref} />
})

Audio.displayName = 'Audio'

Audio.defaultProps = {
  controls: true,
  preload: 'metadata'
}

export const AudioAnimated: AnimatedFREC<AudioProps> = a(Audio)

AudioAnimated.displayName = 'AudioAnimated'

AudioAnimated.defaultProps = {}
