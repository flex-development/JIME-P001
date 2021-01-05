import { GridRowSpan } from '@system/types'
import { BoxProps } from '../Box'

/**
 * @file Component Props - GridRow
 * @module lib/atoms/GridRow/props
 */

export interface GridRowProps extends BoxProps {
  /**
   * Number of rows to span on large devices.
   */
  $lg?: boolean | GridRowSpan

  /**
   * Number of rows to span on medium devices.
   */
  $md?: boolean | GridRowSpan

  /**
   * Number of rows to span on extra small devices.
   */
  $span?: GridRowSpan

  /**
   * Number of rows to span on small devices.
   */
  $sm?: boolean | GridRowSpan

  /**
   * Number of rows to span on extra large devices.
   */
  $xl?: boolean | GridRowSpan

  /**
   * Number of rows to span on extra small devices.
   */
  $xs?: boolean | GridRowSpan

  /**
   * Number of rows to span on extra extra large devices.
   */
  $xxl?: boolean | GridRowSpan
}
