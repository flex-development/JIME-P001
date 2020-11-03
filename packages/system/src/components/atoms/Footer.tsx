import { useMutatedProps } from '@system/hooks'
import { RefProps } from '@system/types'
import React, { forwardRef, ForwardRefExoticComponent as FREC } from 'react'

/**
 * @file Render a `<footer>` element
 * @module components/atoms/Footer
 */

/**
 * Renders a `<footer>` element.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer**
 */
export const Footer: FREC<RefProps> = forwardRef((props, ref) => {
  const mutated = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['footer']
  >(props)

  return <footer {...mutated} ref={ref} />
})

Footer.displayName = 'Footer'

Footer.defaultProps = {}
