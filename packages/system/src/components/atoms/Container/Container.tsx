import { GridBreakpoint } from '@flex-development/kustomzcore'
import { useMutatedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'
import { BoxRefAttributes } from '../Box'

/**
 * @file Layout component
 * @module components/atoms/Container/impl
 */

export interface ContainerProps extends MutatedProps<HTMLDivElement> {
  /**
   * Allow the `Container` to fill all of its available horizontal space.
   *
   * @default false
   */
  fluid?: boolean

  /**
   * Allow the `Container` to fill all of its available horizontal space until
   * the specified breakpoint is reached.
   */
  size?: GridBreakpoint

  /**
   * Allow the `Container` to fill all of its available vertical space.
   *
   * @default false
   */
  stretch?: boolean
}

export type ReflessContainerProps = PropsWithoutRef<ContainerProps>

export type ContainerRefProps = ReflessContainerProps & BoxRefAttributes

/**
 * Renders a `<div>` element with the class `container`.
 *
 * - https://v5.getbootstrap.com/docs/5.0/layout/containers
 * - https://developer.mozilla.org/docs/Web/HTML/Element/div
 * - https://developer.mozilla.org/docs/Web/API/HTMLDivElement
 */
export const Container: FREC<ContainerRefProps> = forwardRef((props, ref) => {
  const { fluid, size, stretch, ...rest } = props

  const mutated = useMutatedProps<typeof rest, JSX.IntrinsicElements['div']>(
    rest,
    {
      container: !fluid && !size,
      'container-fluid': fluid,
      [`container-${size}`]: !!size,
      'container-stretch': stretch
    }
  )

  return <div {...mutated} ref={ref} />
})

Container.displayName = 'Container'

Container.defaultProps = {
  fluid: false
}
