import type { BoxProps } from '@system/lib/atoms/Box'

/**
 * @file Component Props - AddThisToolbox
 * @module lib/atoms/AddThisToolbox/props
 */

export interface AddThisToolboxProps extends BoxProps {
  /**
   * String indicating the type of AddThis toolbox to render.
   *
   * This value can be found in the "Get The Code" section of the Tools
   * settings on the AddThis dashboard.
   *
   * @default 'inline_share'
   */
  type?: string
}
