import { IProductListing } from '@flex-development/kustomzcore'
import { useSanitizedProps } from '@system/hooks'
import { Heading, Main, MainProps, Section, Span } from '@system/lib/atoms'
import { ProductGrid } from '@system/lib/organisms'
import { TC } from '@system/types'
import { SearchTemplateProps } from './SearchTemplate.props'

/**
 * @file Implementation - SearchTemplate
 * @module lib/templates/SearchTemplate/impl
 */

/**
 * Displays product search results.
 *
 * Renders a `Main` component with the classes `template` and `search-template`,
 * as well as the attribute `data-template='search'`.
 */
export const SearchTemplate: TC<SearchTemplateProps> = props => {
  const { results = [], ...rest } = props

  const sanitized = useSanitizedProps<'main', MainProps>(
    rest,
    'search-template'
  )

  return (
    <Main {...sanitized} data-template={SearchTemplate.template_id}>
      <Section id='template-header'>
        <Heading className='template-heading'>
          Search Results <Span>({`${results.length}`})</Span>
        </Heading>
      </Section>

      <ProductGrid products={results as Array<IProductListing>} />
    </Main>
  )
}

SearchTemplate.displayName = 'SearchTemplate'

SearchTemplate.defaultProps = {
  results: []
}

SearchTemplate.template_id = 'search'
