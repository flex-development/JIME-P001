import { ProductResource } from '@flex-development/kustomtypez'
import { useMutatedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import React from 'react'
import { Heading, Main, Paragraph, Section } from '../atoms'
import { ProductGrid } from '../organisms'

/**
 * @file Display the items in a user's cart
 * @module lib/templates/CollectionTemplate
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

export const CollectionTemplateDefaultProps = {
  products: []
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
    products = CollectionTemplateDefaultProps.products,
    title,
    ...rest
  } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'template')

  return (
    <Main {...mutated} data-template={CollectionTemplate.template_id}>
      <Section>
        <Heading size={2}>{title}</Heading>
        {description && <Paragraph>{description}</Paragraph>}
        <ProductGrid className='mt-24' products={products} />
      </Section>
    </Main>
  )
}

CollectionTemplate.template_id = 'collection'

CollectionTemplate.defaultProps = {}
