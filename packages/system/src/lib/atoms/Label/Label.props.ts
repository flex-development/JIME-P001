import type { ComponentPropsBase } from '@system/types'

/**
 * @file Component Props - Label
 * @module lib/atoms/Label/props
 */

export interface LabelProps extends ComponentPropsBase<'label'> {
  /**
   * If true, add the class `form-label`.
   */
  $form?: boolean

  /**
   * The `id` of a labelable form-related element in the same document as the
   * `<label>` element.
   *
   * If this attribute is missing, the form-related element should be nested
   * within the `Label` instead.
   *
   * Because `for` is a reserved keyword in JavaScript, React uses `htmlFor`
   * instead.
   */
  htmlFor?: string
}
