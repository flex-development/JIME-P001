import { useMutatedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import React from 'react'
import { ICollectionListing, IProductListing } from 'shopify-api-node'
import { Heading, Main, Paragraph, Section } from '../atoms'
import { ProductGrid } from '../organisms'

/**
 * @file Display the items in a user's cart
 * @module components/templates/CollectionTemplate
 */

export interface CollectionTemplateProps extends MutatedProps {
  /**
   * Collection description.
   */
  body_html?: ICollectionListing['body_html']

  /**
   * Array of `IProductListing` objects that belong to the current collection.
   *
   * @default []
   */
  products?: Array<IProductListing>

  /**
   * Title of the collection.
   */
  title: ICollectionListing['title']
}

/**
 * Displays the title of a collection as well as the products in it.
 *
 * Renders a `Main` component with the class `template` and attribute
 * `data-template='collection'`.
 */
export const CollectionTemplate: TC<CollectionTemplateProps> = (
  props: CollectionTemplateProps
) => {
  const { body_html, products = [], title, ...rest } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'template')

  return (
    <Main {...mutated} data-template={CollectionTemplate.template_id}>
      <Section>
        <Heading size={2}>{title}</Heading>
        {body_html && <Paragraph>{body_html}</Paragraph>}
        <ProductGrid mt={24} products={products} />
      </Section>
    </Main>
  )
}

CollectionTemplate.displayName = 'CollectionTemplate'

CollectionTemplate.defaultProps = {
  products: []
}

CollectionTemplate.template_id = 'collection'
