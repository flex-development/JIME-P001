import { useMutatedProps } from '@system/hooks'
import { MutatedRefProps } from '@system/types'
import { forwardRef, ForwardRefExoticComponent as FREC } from 'react'

/**
 * @file Render a `<summary>` element
 * @module components/atoms/Summary/impl
 */

/**
 * Renders a `<summary>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/summary
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Summary: FREC<MutatedRefProps> = forwardRef((props, ref) => {
  const mutated = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['summary']
  >(props)

  return <summary {...mutated} ref={ref} />
})

Summary.displayName = 'Summary'

Summary.defaultProps = {}
