import { ComponentPropsBase } from '@system/types'

/**
 * @file Component Props - Heading
 * @module lib/atoms/Heading/props
 */

export interface HeadingProps extends ComponentPropsBase<'h1'> {
  /**
   * Heading size.
   *
   * @default 1
   */
  $size?: 1 | 2 | 3 | 4 | 5 | 6
}
