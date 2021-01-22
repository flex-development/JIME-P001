import type { ComponentPropsBase } from '@system/types'

/**
 * @file Component Props - Section
 * @module lib/atoms/Section/props
 */

export interface SectionProps extends ComponentPropsBase<'section'> {
  /**
   * If true, render as template content section.
   */
  $content?: boolean
}
