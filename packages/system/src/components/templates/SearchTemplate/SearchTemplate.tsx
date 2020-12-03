import { useMutatedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import { IProductListing } from 'shopify-api-node'
import { Heading, Main, Section, Span } from '../../atoms'
import { ProductGrid } from '../../organisms'

/**
 * @file Display the items in a user's cart
 * @module components/templates/SearchTemplate/SearchTemplate
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

  const mutated = useMutatedProps<typeof rest>(rest, 'template')

  return (
    <Main {...mutated} data-template={SearchTemplate.template_id}>
      <Section>
        <Heading mb={24} size={2}>
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
