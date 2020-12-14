import { AnyObject } from '@flex-development/json'
import useBoolean, { UseBooleanActions } from 'react-hanger/array/useBoolean'
import {
  AnimatedProps,
  InterpolatorConfig as IC,
  SpringValue,
  useSpring,
  UseSpringProps
} from 'react-spring'
import { useMemoCompare } from '../useMemoCompare'

/**
 * @file Animate the CSS `scale` transformation
 * @module hooks/useTransformScaleX/impl
 */

export type UseTransformScaleX<T extends AnyObject = AnyObject> = {
  style: AnimatedProps<T>['style']['transform']
  sx?: SpringValue<number>
  toggle: UseBooleanActions['toggle']
}

export type UseTransformScaleXSpringProps = UseSpringProps<{
  config: { duration: number }
  from: { sx: number }
  sx: number
}>

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
 * @param initialSX - Number representing the abscissa of the scaling vector
 * @param intconfig - Interpolator config
 * @param duration - Number of milliseconds the animation should run
 * @returns Object containing current sx value, style object, and function to
 * toggle when animation runs
 */
export function useTransformScaleX<T extends AnyObject = AnyObject>(
  initialSX: number = UseTransformScaleXDefaults.sx,
  duration: number = UseTransformScaleXDefaults.duration,
  intconfig: IC<number> = UseTransformScaleXDefaults.intconfig
): UseTransformScaleX<T> {
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
    style: useMemoCompare<UseTransformScaleX<T>['style']>(style),
    sx,
    toggle
  }
}
