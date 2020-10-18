import { useGridOptions, useMutatedProps } from '@system/hooks'
import { GridSpanConfig } from '@system/types'
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
   * Number of columns to span on extra small devices.
   */
  xs?: GridSpanConfig['xs']

  /**
   * Number of columns to span on small devices.
   */
  sm?: GridSpanConfig['sm']

  /**
   * Number of columns to span on medium devices.
   */
  md?: GridSpanConfig['md']

  /**
   * Number of columns to span on large devices.
   */
  lg?: GridSpanConfig['lg']

  /**
   * Number of columns to span on extra large devices.
   */
  xl?: GridSpanConfig['xl']

  /**
   * Number of columns to span on extra extra large devices.
   */
  xxl?: GridSpanConfig['xxl']
}

export type ReflessColumnProps = PropsWithoutRef<ColumnProps>

export type ColumnRefProps = ReflessColumnProps & BoxRefAttributes

/**
 * Grid layout component.
 *
 * - https://v5.getbootstrap.com/docs/5.0/layout/columns/
 */
export const Column: FREC<ColumnRefProps> = forwardRef((props, ref) => {
  const { lg, md, sm, xl, xs, xxl, ...rest } = props

  const grid_span = useGridOptions({ lg, md, sm, xl, xs, xxl })

  const mutated = useMutatedProps<typeof rest>(rest, {
    col: grid_span.length === 0,
    [grid_span]: true
  })

  return <div {...mutated} ref={ref} />
})

Column.displayName = 'Column'

Column.defaultProps = {}