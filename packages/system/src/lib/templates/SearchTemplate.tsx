import { ProductResource } from '@flex-development/kustomtypez'
import { useMutatedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import React from 'react'
import { Heading, Main, Section, Span } from '../atoms'
import { ProductGrid } from '../organisms'

/**
 * @file Display the items in a user's cart
 * @module lib/templates/SearchTemplate
 */

export interface SearchTemplateProps extends MutatedProps {
  /**
   * Product search results.
   *
   * @default []
   */
  results?: ProductResource[]
}

export const SearchTemplateDefaultProps = {
  results: []
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
  const { results = SearchTemplateDefaultProps.results, ...rest } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'template')

  return (
    <Main {...mutated} data-template={SearchTemplate.template_id}>
      <Section>
        <Heading mb={24} size={2}>
          Search Results&nbsp;
          <Span className='text-primary'>({`${results.length}`})</Span>
        </Heading>
        <ProductGrid products={results} />
      </Section>
    </Main>
  )
}

SearchTemplate.template_id = 'search'

SearchTemplate.defaultProps = SearchTemplateDefaultProps
