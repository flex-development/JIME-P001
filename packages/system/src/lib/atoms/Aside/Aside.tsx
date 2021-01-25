import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import type { AsideProps } from './Aside.props'

/**
 * @file Implementation - Aside
 * @module lib/atoms/Aside/impl
 */

/**
 * Renders an `<audio>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/audio
 * - https://developer.mozilla.org/docs/Web/API/HTMLAsideElement
 */
export const Aside: FREC<AsideProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<'aside'>(props)
  return <aside {...sanitized} ref={ref} />
})

Aside.displayName = 'Aside'

Aside.defaultProps = {}

export const AsideAnimated: AnimatedFREC<AsideProps> = a(Aside)

AsideAnimated.displayName = 'AsideAnimated'

AsideAnimated.defaultProps = {}
