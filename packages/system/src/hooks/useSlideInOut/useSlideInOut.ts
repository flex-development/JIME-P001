import { RefObject, useRef } from 'react'
import useBoolean, { UseBooleanActions } from 'react-hanger/array/useBoolean'
import { useSpring, UseSpringProps } from 'react-spring'

/**
 * @file Slide an element on and off screen
 * @module hooks/useSlideInOut/impl
 */

export type UseSlideInOut<E = HTMLElement> = {
  ref: RefObject<E>
  setVisibility: UseBooleanActions['setValue']
  style: UseSpringProps<{ marginLeft: string }>
  toggle: UseBooleanActions['toggle']
  visible: boolean
}

/**
 * Slides an HTML element on and off screen.
 *
 * @see https://www.react-spring.io/docs/hooks/use-spring
 *
 * @param show - True if element should be shown
 * @return Object containing reference to HTML element, style object, and
 * functions to intertact with animation
 */
export function useSlideInOut<E = HTMLElement>(show = false): UseSlideInOut<E> {
  // Get reference to HTML element
  const element = useRef<E>(null)

  // Get element offset width
  const { offsetWidth = 0 } = (element?.current ?? {}) as HTMLElement

  // If true, element is visible
  const [visible, { setValue: setVisibility, toggle }] = useBoolean(show)

  // Create spring animation
  const style = useSpring({
    marginLeft: `${visible ? 0 : offsetWidth * -1}px`,
    opacity: visible ? 1 : 0
  })

  return {
    ref: element,
    setVisibility,
    style,
    toggle,
    visible
  }
}
