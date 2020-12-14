import { Main, MDXBox } from '@system/components/ui/atoms'
import { useSanitizedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'

/**
 * @file Basic page template
 * @module components/ui/templates/PageTemplate/impl
 */

export interface PageTemplateProps extends MutatedProps {
  /**
   * Markdown or MDX string containing page content.
   */
  body?: string
}

/**
 * Custom page template. Page content can be written using Markdown or MDX.
 *
 * Renders a `Main` component with the class `template` and attribute
 * `data-template='page'`.
 *
 * - https://mdxjs.com/playground
 */
export const PageTemplate: TC<PageTemplateProps> = (
  props: PageTemplateProps
) => {
  const { body, ...rest } = props

  const sanitized = useSanitizedProps<typeof rest>(rest, 'template')

  return (
    <Main {...sanitized} data-template={PageTemplate.template_id}>
      <MDXBox>{body}</MDXBox>
    </Main>
  )
}

PageTemplate.displayName = 'PageTemplate'

PageTemplate.defaultProps = {
  body: ''
}

PageTemplate.template_id = 'page'
