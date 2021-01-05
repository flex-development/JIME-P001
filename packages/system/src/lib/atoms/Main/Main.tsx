import { useSanitizedProps } from '@system/hooks'
import { FREC } from '@system/types'
import { isEmpty } from 'lodash'
import { forwardRef } from 'react'
import { a } from 'react-spring'
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
    { template: !isEmpty(props['data-template']) }
  )

  return <a.main {...sanitized} ref={ref} />
})

Main.displayName = 'Main'

Main.defaultProps = {}
