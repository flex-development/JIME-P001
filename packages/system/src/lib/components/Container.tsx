import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'
import { ContainerSize } from '../declarations'
import { BoxProps, BoxRefAttributes } from '../elements'
import { useMutatedProps } from '../modules/hooks'

/**
 * @module lib/elements/Container
 * @see {@link https://v5.getbootstrap.com/docs/5.0/layout/containers/}
 */

/**
 * {@link Container} component properties.
 */
export interface ContainerProps extends Omit<BoxProps, 'size'> {
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
  size?: ContainerSize
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
    container: true,
    'container-fluid': fluid,
    [`container-${size}`]: size ? true : false
  })

  return <div {...mutatedProps} ref={ref} />
})

Container.defaultProps = {
  fluid: false
}
