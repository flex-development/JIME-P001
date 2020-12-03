import { useMutatedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import { Main, MDXBox } from '../../atoms'

/**
 * @file Basic page template
 * @module components/templates/PageTemplate/PageTemplate
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

  const mutated = useMutatedProps<typeof rest>(rest, 'template')

  return (
    <Main {...mutated} data-template={PageTemplate.template_id}>
      <MDXBox>{body}</MDXBox>
    </Main>
  )
}

PageTemplate.displayName = 'PageTemplate'

PageTemplate.defaultProps = {
  body: ''
}

PageTemplate.template_id = 'page'
