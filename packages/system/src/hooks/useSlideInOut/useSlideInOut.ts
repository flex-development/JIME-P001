import type { UseSpringProps } from '@react-spring/web'
import { useSpring } from '@react-spring/web'
import type { RefObject } from 'react'
import { useRef } from 'react'
import type { UseBooleanActions } from 'react-hanger/array/useBoolean'
import useBoolean from 'react-hanger/array/useBoolean'

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
 * @template E - HTML element
 *
 * @param {boolean} show - True if element should be shown
 * @return {UseSlideInOut<E>} Hook state
 */
export function useSlideInOut<E = HTMLElement>(
  show: boolean = false
): UseSlideInOut<E> {
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
