import { GridBreakpoint } from '@flex-development/kustomzcore'
import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'
import { BoxProps } from '../Box'

export interface ContainerProps extends BoxProps {
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

/**
 * Renders a `<div>` element with the class `container`.
 *
 * - https://v5.getbootstrap.com/docs/5.0/layout/containers
 * - https://developer.mozilla.org/docs/Web/HTML/Element/div
 * - https://developer.mozilla.org/docs/Web/API/HTMLDivElement
 */
export const Container: FREC<ContainerProps> = forwardRef((props, ref) => {
  const { fluid, size, stretch, ...rest } = props

  const sanitized = useSanitizedProps<typeof rest, AnimatedFREC<'div'>>(rest, {
    container: !fluid && !size,
    'container-fluid': fluid,
    [`container-${size}`]: !!size,
    'container-stretch': stretch
  })

  return <animated.div {...sanitized} ref={ref} />
})

Container.displayName = 'Container'

Container.defaultProps = {
  fluid: false
}
