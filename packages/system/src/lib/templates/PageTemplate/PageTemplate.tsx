import { useSanitizedProps } from '@system/hooks'
import { Main, MainProps, MDXContent } from '@system/lib/atoms'
import { TC } from '@system/types'
import { PageTemplateProps } from './PageTemplate.props'

/**
 * @file Implementation - PageTemplate
 * @module lib/templates/PageTemplate/impl
 */

/**
 * Custom page template. Page content can be written using Markdown or MDX.
 *
 * Renders a `Main` component with the classes `template` and `page-template`,
 * as well as the attribute `data-template='page'`.
 *
 * - https://mdxjs.com/playground
 */
export const PageTemplate: TC<PageTemplateProps> = props => {
  const { body, ...rest } = props

  const sanitized = useSanitizedProps<'main', MainProps>(rest, 'page-template')

  return (
    <Main {...sanitized} data-template={PageTemplate.template_id}>
      <MDXContent>{body}</MDXContent>
    </Main>
  )
}

PageTemplate.displayName = 'PageTemplate'

PageTemplate.defaultProps = {
  body: ''
}

PageTemplate.template_id = 'page'
