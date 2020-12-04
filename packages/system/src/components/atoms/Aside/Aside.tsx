import { useMutatedProps } from '@system/hooks'
import { MutatedRefProps } from '@system/types'
import { forwardRef, ForwardRefExoticComponent as FREC } from 'react'

/**
 * @file Render an `<aside>` element
 * @module components/atoms/Aside/impl
 */

/**
 * Renders an `<aside>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/aside
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Aside: FREC<MutatedRefProps> = forwardRef((props, ref) => {
  const mutated = useMutatedProps<typeof props, JSX.IntrinsicElements['aside']>(
    props
  )

  return <aside {...mutated} ref={ref} />
})

Aside.displayName = 'Aside'

Aside.defaultProps = {}
