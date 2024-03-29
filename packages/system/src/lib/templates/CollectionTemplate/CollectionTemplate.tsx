import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Heading } from '@system/lib/atoms/Heading'
import type { MainProps } from '@system/lib/atoms/Main'
import { Main } from '@system/lib/atoms/Main'
import { Paragraph } from '@system/lib/atoms/Paragraph'
import { Section } from '@system/lib/atoms/Section'
import { ProductGrid } from '@system/lib/organisms/ProductGrid'
import { TC } from '@system/types'
import type { CollectionTemplateProps } from './CollectionTemplate.props'

/**
 * @file Implementation - CollectionTemplate
 * @module lib/templates/CollectionTemplate/impl
 */

/**
 * Displays the title of a collection as well as the products in it.
 *
 * Renders a `Main` component with the classes `template` and
 * `collection-template`, as well as the attribute `data-template='collection'`.
 */
export const CollectionTemplate: TC<CollectionTemplateProps> = props => {
  const {
    collection,
    handleProductLink = () => ({ href: '#' }),
    products = [],
    ...rest
  } = props

  const sanitized = useSanitizedProps<'main', MainProps>(
    rest,
    'collection-template'
  )

  return (
    <Main {...sanitized} data-template={CollectionTemplate.template_id}>
      <Section id='template-header'>
        <Heading className='template-heading'>{collection.title}</Heading>
        {collection.body_html && <Paragraph>{collection.body_html}</Paragraph>}
      </Section>

      <ProductGrid
        className='collection-template-grid'
        products={products.map(product => ({
          product,
          product_link: handleProductLink(product)
        }))}
      />
    </Main>
  )
}

CollectionTemplate.displayName = 'CollectionTemplate'

CollectionTemplate.defaultProps = {
  products: []
}

CollectionTemplate.template_id = 'collection'
