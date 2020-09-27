import { useMutatedProps } from '@kustomz/hooks'
import { RefProps } from '@kustomz/types'
import React, { forwardRef, ForwardRefExoticComponent as FREC } from 'react'

/**
 * @file Render an `<aside>` element
 * @module lib/elements/Aside
 */

/**
 * Renders an `<aside>` element.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside**
 */
export const Aside: FREC<RefProps> = forwardRef((props, ref) => {
  const mutatedProps = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['aside']
  >(props)

  return <aside {...mutatedProps} ref={ref} />
})

Aside.defaultProps = {}
