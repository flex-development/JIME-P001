import { useSanitizedProps } from '@system/hooks'
import { Heading, Main, MainProps, Paragraph, Section } from '@system/lib/atoms'
import { ProductGrid } from '@system/lib/organisms'
import { TC } from '@system/types'
import { CollectionTemplateProps } from './CollectionTemplate.props'

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
    handleProductLink = () => {
      console.log('TODO: CollectionTemplate.handleProductLink')
      return { href: '#' }
    },
    products = [],
    ...rest
  } = props
  const { body_html, title } = collection

  const sanitized = useSanitizedProps<'main', MainProps>(
    rest,
    'collection-template'
  )

  return (
    <Main {...sanitized} data-template={CollectionTemplate.template_id}>
      <Section id='template-header'>
        <Heading className='template-heading'>{title}</Heading>
        {body_html && <Paragraph>{body_html}</Paragraph>}
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
