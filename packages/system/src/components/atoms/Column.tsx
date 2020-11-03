import { useColumn, useFlexbox, useMutatedProps } from '@system/hooks'
import { Columns } from '@system/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'
import { BoxRefAttributes } from './Box'
import { FlexBoxProps } from './FlexBox'

/**
 * @file Grid item component
 * @module components/atoms/Column
 */

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

export type ReflessColumnProps = PropsWithoutRef<ColumnProps>

export type ColumnRefProps = ReflessColumnProps & BoxRefAttributes

/**
 * Grid layout component.
 *
 * - https://v5.getbootstrap.com/docs/5.0/layout/columns/
 */
export const Column: FREC<ColumnRefProps> = forwardRef((props, ref) => {
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

  const mutated = useMutatedProps<typeof rest>(rest, {
    [column]: true,
    [flexbox]: flexbox.length !== 0
  })

  return <div {...mutated} ref={ref} />
})

Column.displayName = 'Column'

Column.defaultProps = {}
