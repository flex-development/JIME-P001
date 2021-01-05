import { ComponentPropsBase } from '@system/types'

/**
 * @file Component Props - Paragraph
 * @module lib/atoms/Paragraph/props
 */

export interface ParagraphProps extends ComponentPropsBase<'p'> {
  /**
   * If true, render as `Form` text element.
   */
  $form?: boolean
}
