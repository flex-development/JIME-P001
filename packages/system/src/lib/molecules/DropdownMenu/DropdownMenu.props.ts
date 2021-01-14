import { ListProps } from '@system/lib/atoms/List'

/**
 * @file Component Props - DropdownMenu
 * @module lib/molecules/DropdownMenu/props
 */

export interface DropdownMenuProps extends ListProps {
  /**
   * `id` of HTML element that opens and closes the dropdown menu.
   */
  'aria-labelledby': string

  /**
   * If true, dropdown menu should be expanded.
   */
  expanded?: boolean
}
