import { GridColumnSpan } from '@system/types'
import { BoxProps } from '../Box'

/**
 * @file Component Props - GridColumn
 * @module lib/atoms/GridColumn/props
 */

export interface GridColumnProps extends BoxProps {
  /**
   * Number of columns to span on large devices.
   */
  $lg?: boolean | GridColumnSpan

  /**
   * Number of columns to span on medium devices.
   */
  $md?: boolean | GridColumnSpan

  /**
   * Number of columns to span on extra small devices.
   */
  $span?: GridColumnSpan

  /**
   * Number of columns to span on small devices.
   */
  $sm?: boolean | GridColumnSpan

  /**
   * Number of columns to span on extra large devices.
   */
  $xl?: boolean | GridColumnSpan

  /**
   * Number of columns to span on extra small devices.
   */
  $xs?: boolean | GridColumnSpan

  /**
   * Number of columns to span on extra extra large devices.
   */
  $xxl?: boolean | GridColumnSpan
}
