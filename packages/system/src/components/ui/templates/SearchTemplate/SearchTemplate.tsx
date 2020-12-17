import { IProductListing } from '@flex-development/kustomzcore'
import { Heading, Main, Section, Span } from '@system/components/ui/atoms'
import { ProductGrid } from '@system/components/ui/organisms'
import { useSanitizedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'

/**
 * @file Display the items in a user's cart
 * @module components/ui/templates/SearchTemplate/impl
 */

export interface SearchTemplateProps extends MutatedProps {
  /**
   * Product search results.
   *
   * @default []
   */
  results?: Array<IProductListing | Partial<IProductListing>>
}

/**
 * Displays product search results.
 *
 * Renders a `Main` component with the class `template` and attribute
 * `data-template='Search'`.
 */
export const SearchTemplate: TC<SearchTemplateProps> = (
  props: SearchTemplateProps
) => {
  const { results = [], ...rest } = props

  const sanitized = useSanitizedProps<typeof rest>(rest, 'template')

  return (
    <Main {...sanitized} data-template={SearchTemplate.template_id}>
      <Section>
        <Heading className='h2' mb={24}>
          Search Results&nbsp;
          <Span className='c-primary'>({`${results.length}`})</Span>
        </Heading>
        <ProductGrid products={results as Array<IProductListing>} />
      </Section>
    </Main>
  )
}

SearchTemplate.displayName = 'SearchTemplate'

SearchTemplate.defaultProps = {
  results: []
}

SearchTemplate.template_id = 'search'
