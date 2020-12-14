import { Columns } from '@flex-development/kustomzcore'
import { useColumn, useFlexbox, useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'
import { FlexBoxProps } from '../FlexBox'

export interface ColumnProps extends FlexBoxProps {
  /**
   * Number of columns to span on large devices.
   */
  lg?: boolean | Columns

  /**
   * Number of columns to span on medium devices.
   */
  md?: boolean | Columns

  /**
   * Number of columns to span on extra small devices.
   */
  span?: Columns

  /**
   * Number of columns to span on small devices.
   */
  sm?: boolean | Columns

  /**
   * Number of columns to span on extra large devices.
   */
  xl?: boolean | Columns

  /**
   * Number of columns to span on extra small devices.
   */
  xs?: boolean | Columns

  /**
   * Number of columns to span on extra extra large devices.
   */
  xxl?: boolean | Columns
}

/**
 * Grid layout component.
 *
 * - https://v5.getbootstrap.com/docs/5.0/layout/columns
 * - https://developer.mozilla.org/docs/Web/HTML/Element/div
 * - https://developer.mozilla.org/docs/Web/API/HTMLDivElement
 */
export const Column: FREC<ColumnProps> = forwardRef((props, ref) => {
  const {
    align,
    direction,
    display,
    justify,
    lg,
    md,
    span,
    sm,
    wrap,
    xl,
    xs,
    xxl,
    ...rest
  } = props

  const column = useColumn({ lg, md, sm, xl, xs: span || xs, xxl })

  const flexbox = useFlexbox({
    align,
    direction,
    display,
    justify,
    wrap
  })

  const sanitized = useSanitizedProps<typeof rest, AnimatedFREC<'div'>>(rest, {
    [column]: true,
    [flexbox]: flexbox.length !== 0
  })

  return <animated.div {...sanitized} ref={ref} />
})

Column.displayName = 'Column'

Column.defaultProps = {}
