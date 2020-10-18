import { useMutatedProps } from '@system/hooks'
import { RefProps } from '@system/types'
import React, { forwardRef, ForwardRefExoticComponent as FREC } from 'react'

/**
 * @file Render an `<aside>` element
 * @module lib/atoms/Aside
 */

/**
 * Renders an `<aside>` element.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside**
 */
export const Aside: FREC<RefProps> = forwardRef((props, ref) => {
  const mutated = useMutatedProps<typeof props, JSX.IntrinsicElements['aside']>(
    props
  )

  return <aside {...mutated} ref={ref} />
})

Aside.displayName = 'Aside'

Aside.defaultProps = {}
