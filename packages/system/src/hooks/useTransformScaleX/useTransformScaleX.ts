import type { AnyObject } from '@flex-development/json/utils/types'
import type {
  AnimatedProps,
  InterpolatorConfig as IC,
  SpringValue,
  UseSpringProps
} from '@react-spring/web'
import { useSpring } from '@react-spring/web'
import { useMemoCompare } from '@system/hooks/useMemoCompare'
import type { UseBooleanActions } from 'react-hanger/array/useBoolean'
import useBoolean from 'react-hanger/array/useBoolean'

/**
 * @file Animate the CSS `scale` transformation
 * @module hooks/useTransformScaleX/impl
 */

export type UseTransformScaleX<P extends AnyObject = AnyObject> = {
  style: AnimatedProps<P>['style']['transform']
  sx?: SpringValue<number>
  toggle: UseBooleanActions['toggle']
}

export type UseTransformScaleXSpringProps = UseSpringProps<{
  config: { duration: number }
  from: { sx: number }
  sx: number
}>

/* eslint-disable-next-line tree-shaking/no-side-effects-in-initialization */
export const UseTransformScaleXDefaults = Object.freeze({
  duration: 1000,
  intconfig: {
    output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
    range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1]
  },
  sx: 0
})

/**
 * Animate the CSS `scale` transformation.
 *
 * @see https://codesandbox.io/embed/88lmnl6w88
 * @see https://developer.mozilla.org/docs/Web/CSS/transform-function/scale()
 * @see https://www.react-spring.io/docs/hooks/api
 *
 * @template P - Base props shape
 *
 * @param {number} initialSX - Abscissa of the scaling vector
 * @param {number} duration - Number of milliseconds the animation should run
 * @param {IC<number>} intconfig - Interpolator config
 * @return {UseTransformScaleX<P>} Hook state
 */
export function useTransformScaleX<P extends AnyObject = AnyObject>(
  initialSX: number = UseTransformScaleXDefaults.sx,
  duration: number = UseTransformScaleXDefaults.duration,
  intconfig: IC<number> = UseTransformScaleXDefaults.intconfig
): UseTransformScaleX<P> {
  // Control when the animation runs
  const [animating, { toggle }] = useBoolean(false)

  // Create spring animation
  const { sx } = useSpring<UseTransformScaleXSpringProps>({
    config: { duration },
    from: { sx: initialSX },
    sx: animating ? 1 : 0
  })

  // Get CSS styles
  const style = { transform: sx?.to(intconfig)?.to(sx => `scale(${sx})`) }

  return {
    style: useMemoCompare<UseTransformScaleX<P>['style']>(style),
    sx,
    toggle
  }
}
