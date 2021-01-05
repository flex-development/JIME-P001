import useBoolean from 'react-hanger/array/useBoolean'
import { config, SpringValue, useSpring } from 'react-spring'

/**
 * @file Implementation - useRewindSpring
 * @module hooks/useRewindSpring/impl
 */

export type UseRewindSpring<N1, N2> = {
  value: SpringValue<N1 | N2> | undefined
}

/**
 * Animates the values between {@param from} and {@param to}. When
 * {@param to} is reached, the animation will be reversed.
 *
 * @param from - Initial start value
 * @param to - Initial end value,
 * @param preset - Key from React Spring spring config preset object
 */
export const useRewindSpring = (
  from = 0,
  to = 1,
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
