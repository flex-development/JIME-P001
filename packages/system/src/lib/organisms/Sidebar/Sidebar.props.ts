import {
  NullishNumber,
  NullishString
} from '@flex-development/json/utils/types'
import { AsideProps } from '@system/lib/atoms/Aside'
import { ImageProps } from '@system/lib/atoms/Image'
import { LinkProps } from '@system/lib/atoms/Link'

/**
 * @file Component Props - Sidebar
 * @module lib/organisms/Sidebar/props
 */

export interface SidebarProps extends AsideProps {
  /**
   * Profile age.
   *
   * @default 22
   */
  age?: NullishNumber

  /**
   * Profile image URL.
   *
   * @default {}
   */
  img?: ImageProps['src']

  /**
   * Profile location.
   *
   * @default 'New York'
   */
  location?: NullishString

  /**
   * Links to display in the sidebar menu.
   *
   * @default []
   */
  menu?: LinkProps[]

  /**
   * Profile mood.
   *
   * @default 'High 🤪'
   */
  mood?: NullishString
}
