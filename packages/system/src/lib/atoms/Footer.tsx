import { RefProps } from '@kustomz/types'
import React, { forwardRef, ForwardRefExoticComponent as FREC } from 'react'
import { useMutatedProps } from '../../hooks'

/**
 * @file Render a `<footer>` element
 * @module lib/elements/Footer
 */

/**
 * Renders a `<footer>` element.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer**
 */
export const Footer: FREC<RefProps> = forwardRef((props, ref) => {
  const mutatedProps = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['footer']
  >(props)

  return <footer {...mutatedProps} ref={ref} />
})

Footer.defaultProps = {}
