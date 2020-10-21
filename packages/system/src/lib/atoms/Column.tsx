import { useColumn, useMutatedProps } from '@system/hooks'
import { Columns } from '@system/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'
import { BoxProps, BoxRefAttributes } from './Box'

/**
 * @file Grid item component
 * @module lib/atoms/Column
 */

export interface ColumnProps extends BoxProps {
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
  const { lg, md, span, sm, xl, xs, xxl, ...rest } = props

  const column = useColumn({ lg, md, sm, xl, xs: span || xs, xxl })

  const mutated = useMutatedProps<typeof rest>(rest, column)

  return <div {...mutated} ref={ref} />
})

Column.displayName = 'Column'

Column.defaultProps = {}
