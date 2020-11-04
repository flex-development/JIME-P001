import { useMutatedProps } from '@system/hooks'
import { MutatedProps, ProductResource, TC } from '@system/types'
import React from 'react'
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
  description?: string

  /**
   * Array of `ProductResource` objects.
   *
   * @default []
   */
  products?: ProductResource[]

  /**
   * Title of the collection.
   */
  title: string
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
  const {
    description,
    products = CollectionTemplate.defaultProps?.products,
    title,
    ...rest
  } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'template')

  return (
    <Main {...mutated} data-template={CollectionTemplate.template_id}>
      <Section>
        <Heading size={2}>{title}</Heading>
        {description && <Paragraph>{description}</Paragraph>}
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
