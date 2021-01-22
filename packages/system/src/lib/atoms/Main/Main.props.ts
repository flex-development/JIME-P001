import type { ComponentPropsBase } from '@system/types'

/**
 * @file Component Props - Main
 * @module lib/atoms/Main/props
 */

export interface MainProps extends ComponentPropsBase<'main'> {
  /**
   * If rendering as page template container, this value should be the
   * equivalent of the tempalate's `template_id` property.
   *
   * If defined and a non-empty string, it will override the `id` property.
   */
  'data-template'?: string
}
