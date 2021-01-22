import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { FREC } from '@system/types'
import omit from 'lodash/omit'
import { forwardRef } from 'react'
import type { DividerProps } from './Divider.props'

/**
 * @file Implementation - Divider
 * @module lib/atoms/Divider/impl
 */

/**
 * Renders a `<hr>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/hr
 * - https://developer.mozilla.org/docs/Web/API/HTMLHRElement
 */
export const Divider: FREC<DividerProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<'hr'>(props)

  return <a.hr {...omit(sanitized, ['children'])} ref={ref} />
})

Divider.displayName = 'Divider'

Divider.defaultProps = {}
