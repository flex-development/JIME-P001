import { MainProps } from '@system/lib/atoms'

/**
 * @file Component Props - PageTemplate
 * @module lib/templates/PageTemplate/props
 */

export interface PageTemplateProps extends MainProps {
  /**
   * Markdown or MDX string containing page content.
   */
  body?: string
}
