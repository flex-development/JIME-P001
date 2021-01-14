import { MainProps } from '@system/lib/atoms/Main'

/**
 * @file Component Props - ErrorTemplate
 * @module lib/templates/ErrorTemplate/props
 */

export interface ErrorTemplateProps extends MainProps {
  /**
   * Error status code.
   */
  code: number

  /**
   * Error message.
   */
  message: string
}
