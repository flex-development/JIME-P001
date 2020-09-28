import { useMutatedProps } from '@kustomz/hooks'
import { Breakpoint, MutatedProps } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'
import { BoxRefAttributes } from './Box'

/**
 * @module lib/elements/Container
 * @see {@link https://v5.getbootstrap.com/docs/5.0/layout/containers/}
 */

/**
 * {@link Container} component properties.
 */
export interface ContainerProps extends MutatedProps<HTMLDivElement> {
  /**
   * Allow the Container to fill all of its available horizontal space.
   *
   * @default false
   */
  fluid?: boolean

  /**
   * Allow the Container to fill all of its available horizontal space until the
   * specified breakpoint is reached.
   */
  size?: Breakpoint
}

/**
 * {@link Container} component properties without the `ref` property.
 */
export type ReflessContainerProps = PropsWithoutRef<ContainerProps>

/**
 * {@link Container} component forward ref properties.
 */
export type ContainerRefProps = ReflessContainerProps & BoxRefAttributes

/**
 * Renders a `<div>` element with the class `container`.
 *
 * - **https://v5.getbootstrap.com/docs/5.0/layout/containers/**
 */
export const Container: FREC<ContainerRefProps> = forwardRef((props, ref) => {
  const { fluid, size, ...rest } = props

  const mutatedProps = useMutatedProps<
    typeof rest,
    JSX.IntrinsicElements['div']
  >(rest, {
    container: !fluid && !size,
    'container-fluid': fluid,
    [`container-${size}`]: !!size
  })

  return <div {...mutatedProps} ref={ref} />
})

Container.defaultProps = {
  fluid: false
}
