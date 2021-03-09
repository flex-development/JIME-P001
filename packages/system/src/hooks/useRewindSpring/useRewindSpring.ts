import type { SpringValue } from '@react-spring/web'
import { config, useSpring } from '@react-spring/web'
import useBoolean from 'react-hanger/array/useBoolean'

/**
 * @file Implementation - useRewindSpring
 * @module hooks/useRewindSpring/impl
 */

export type UseRewindSpring<N1, N2> = {
  /**
   * Spring value.
   */
  value: SpringValue<N1 | N2> | undefined
}

/**
 * Animates the values between {@param from} and {@param to}. When
 * {@param to} is reached, the animation will be reversed.
 *
 * @param {number} [from] - Initial start value
 * @param {number} [to] - Initial end value,
 * @param {keyof typeof config} preset - React Spring spring preset key
 * @return {UseRewindSpring<number, number>} Hook state
 */
export const useRewindSpring = (
  from: number = 0,
  to: number = 1,
  preset: keyof typeof config = 'molasses'
): UseRewindSpring<typeof from, typeof to> => {
  // Track when animation should reverse
  const [reverse, { toggle: onRest }] = useBoolean(false)

  // Configure spring animation
  return useSpring({
    config: config[preset],
    delay: 200,
    from: { value: from },
    onRest,
    reset: true,
    reverse,
    value: to
  })
}
