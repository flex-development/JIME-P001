import { MainProps } from '@system/lib/atoms'
import { MDXContentProps } from '@system/lib/molecules'

/**
 * @file Component Props - PageTemplate
 * @module lib/templates/PageTemplate/props
 */

export interface PageTemplateProps extends MainProps {
  /**
   * Markdown or MDX string containing page content.
   */
  body?: MDXContentProps['code']

  /**
   * `MDXContent` component scope.
   *
   * @default {}
   */
  scope?: MDXContentProps['scope']
}
