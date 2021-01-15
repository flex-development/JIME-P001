import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { FREC } from '@system/types'
import { forwardRef } from 'react'
import { MainProps } from './Main.props'

/**
 * @file Implementation - Main
 * @module lib/atoms/Main/impl
 */

/**
 * Renders a `<main>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/main
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Main: FREC<MainProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<'main'>(
    { ...props, id: props['data-template'] || props.id },
    { template: (props?.['data-template'] ?? '').length > 0 }
  )

  return <a.main {...sanitized} ref={ref} />
})

Main.displayName = 'Main'

Main.defaultProps = {}