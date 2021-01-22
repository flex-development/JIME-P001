import type { ComponentPropsBase } from '@system/types'
import { ItemProps } from '../Item'

/**
 * @file Component Props - List
 * @module lib/atoms/List/props
 */

export interface ListProps extends ComponentPropsBase<'ul'> {
  /**
   * Array of `Item` component properties.
   *
   * @default []
   */
  $items?: ItemProps[]

  /**
   * Type of list element to render.
   */
  is?: 'ol' | 'ul'
}
