import { ProductResource } from '@flex-development/types'
import { useMutatedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import React from 'react'
import { Heading, Main, Section, Span } from '../atoms'
import { ProductGrid } from '../organisms'

/**
 * @file Display the items in a user's cart
 * @module components/templates/SearchTemplate
 */

export interface SearchTemplateProps extends MutatedProps {
  /**
   * Product search results.
   *
   * @default []
   */
  results?: ProductResource[]
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
  const {
    results = SearchTemplate.defaultProps?.results as ProductResource[],
    ...rest
  } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'template')

  return (
    <Main {...mutated} data-template={SearchTemplate.template_id}>
      <Section>
        <Heading mb={24} size={2}>
          Search Results&nbsp;
          <Span className='c-primary'>({`${results.length}`})</Span>
        </Heading>
        <ProductGrid products={results} />
      </Section>
    </Main>
  )
}

SearchTemplate.displayName = 'SearchTemplate'

SearchTemplate.defaultProps = {
  results: []
}

SearchTemplate.template_id = 'search'
