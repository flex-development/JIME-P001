import { FlexboxUtilitiesConfig } from '@flex-development/kustomzcore'
import { useFlexbox, useMutatedProps } from '@system/hooks'
import { isBoolean, isString } from 'lodash'
import {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'
import { BoxProps, BoxRefAttributes } from '../Box'

/**
 * @file Flexbox layout component
 * @module components/atoms/FlexBox/impl
 */

export interface FlexBoxProps extends BoxProps {
  /**
   * Use `align-items` utilities on flexbox containers to change the alignment
   * of flex items on the cross axis (the y-axis to start, x-axis if
   * `flex-direction: column`).
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/flex/#align-items
   */
  align?: FlexboxUtilitiesConfig['align']

  /**
   * Add a container class.
   *
   * - https://v5.getbootstrap.com/docs/5.0/layout/containers/
   */
  container?: boolean | string

  /**
   * Set the direction of flex items in a flex container with direction
   * utilities.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/flex/#direction
   */
  direction?: FlexboxUtilitiesConfig['direction']

  /**
   * Defines the flex container as `block` or `inline`.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/flex
   *
   * @default 'flex'
   */
  display?: FlexboxUtilitiesConfig['display']

  /**
   * Use `justify-content` utilities on flexbox containers to change the
   * alignment of flex items on the main axis (the x-axis to start, y-axis if
   * `flex-direction: column`).
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/flex/#justify-content
   */
  justify?: FlexboxUtilitiesConfig['justify']

  /**
   * Change how flex items wrap in a flex container.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/flex/#wrap
   */
  wrap?: FlexboxUtilitiesConfig['wrap']
}

export type ReflessFlexBoxProps = PropsWithoutRef<FlexBoxProps>

export type FlexBoxRefProps = ReflessFlexBoxProps & BoxRefAttributes

/**
 * Flexbox layout component.
 *
 * - https://v5.getbootstrap.com/docs/5.0/utilities/flex
 * - https://developer.mozilla.org/docs/Web/HTML/Element/div
 * - https://developer.mozilla.org/docs/Web/API/HTMLDivElement
 */
export const FlexBox: FREC<FlexBoxRefProps> = forwardRef((props, ref) => {
  const { align, container, direction, display, justify, wrap, ...rest } = props

  const flexbox = useFlexbox({
    align,
    direction,
    display,
    justify,
    wrap
  })

  const mutated = useMutatedProps<typeof rest>(rest, {
    container: isBoolean(container) && container,
    [`container-${container}`]: isString(container),
    [flexbox]: true
  })

  return <div {...mutated} ref={ref} />
})

FlexBox.displayName = 'FlexBox'

FlexBox.defaultProps = {
  display: 'flex'
}
