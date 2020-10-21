import {
  useFlexbox,
  useMutatedProps,
  useRowColumns,
  useSpacers
} from '@system/hooks'
import { ResponsiveUtility, RowColumns, Spacer } from '@system/types'
import { isObject } from 'lodash'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'
import { BoxRefAttributes } from './Box'
import { FlexBoxProps } from './FlexBox'

/**
 * @file `Column` wrapper component
 * @module lib/atoms/Row
 */

export interface RowProps extends FlexBoxProps {
  /**
   * Key from `$gutters` map to create horizontal gutter utility class.
   *
   * - https://v5.getbootstrap.com/docs/5.0/layout/gutters/#horizontal-gutters
   */
  gx?: Spacer | ResponsiveUtility<Spacer>

  /**
   * Key from `$gutters` map to create vertical gutter utility class.
   *
   * - https://v5.getbootstrap.com/docs/5.0/layout/gutters/#vertical-gutters
   */
  gy?: Spacer | ResponsiveUtility<Spacer>

  /**
   * Number of columns that will fit next to each other to span on large
   * devices.
   */
  lg?: RowColumns

  /**
   * Number of columns that will fit next to each other to span on extra small
   * devices.
   */
  max?: RowColumns

  /**
   * Number of columns that will fit next to each other to span on medium
   * devices.
   */
  md?: RowColumns

  /**
   * Number of columns that will fit next to each other to span on small
   * devices.
   */
  sm?: RowColumns

  /**
   * Number of columns that will fit next to each other to span on extra large
   * devices.
   */
  xl?: RowColumns

  /**
   * Number of columns that will fit next to each other to span on extra small
   * devices.
   */
  xs?: RowColumns

  /**
   * Number of columns that will fit next to each other to span on extra extra
   * large devices.
   */
  xxl?: RowColumns
}

export type ReflessRowProps = PropsWithoutRef<RowProps>

export type RowRefProps = ReflessRowProps & BoxRefAttributes

/**
 * Grid layout component.
 *
 * - https://v5.getbootstrap.com/docs/5.0/layout/grid/#row-columns
 * - https://v5.getbootstrap.com/docs/5.0/layout/gutters/#row-columns-gutters
 */
export const Row: FREC<RowRefProps> = forwardRef((props, ref) => {
  const {
    align,
    direction,
    display,
    gx,
    gy,
    justify,
    lg,
    max,
    md,
    sm,
    wrap,
    xl,
    xs,
    xxl,
    ...rest
  } = props

  const flexbox = useFlexbox({
    align,
    direction,
    display,
    justify,
    wrap
  })

  const gutter_x = useSpacers('gx', isObject(gx) ? gx : { xs: gx })

  const gutter_y = useSpacers('gy', isObject(gy) ? gy : { xs: gy })

  const row_cols = useRowColumns({ lg, md, sm, xl, xs: max || xs, xxl })

  const mutated = useMutatedProps<typeof rest>(rest, {
    [flexbox]: flexbox.length !== 0,
    [gutter_x]: gutter_x.length !== 0,
    [gutter_y]: gutter_y.length !== 0,
    row: true,
    [row_cols]: row_cols.length !== 0
  })

  return <div {...mutated} ref={ref} />
})

Row.displayName = 'Row'

Row.defaultProps = {}
