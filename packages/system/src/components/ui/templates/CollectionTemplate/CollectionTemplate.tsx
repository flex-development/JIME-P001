import {
  ICollectionListing,
  IProductListing
} from '@flex-development/kustomzcore'
import {
  Heading,
  LinkProps,
  Main,
  Paragraph,
  Section
} from '@system/components/ui/atoms'
import { ProductGrid } from '@system/components/ui/organisms'
import { useSanitizedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'

/**
 * @file Display the items in a user's cart
 * @module components/ui/templates/CollectionTemplate/impl
 */

export interface CollectionTemplateProps extends MutatedProps {
  /**
   * The `ICollectionListing` object.
   */
  collection: ICollectionListing

  /**
   * Returns a `LinkProps` for the `ProductCard` link.
   */
  handleProductLink?(product: IProductListing): LinkProps

  /**
   * Array of `IProductListing` objects that belong to the current collection.
   *
   * @default []
   */
  products?: Array<IProductListing>
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
    collection,
    handleProductLink = () => {
      console.log('TODO: CollectionTemplate.handleProductLink')
      return { href: '#' }
    },
    products = [],
    ...rest
  } = props
  const { body_html, title } = collection

  const sanitized = useSanitizedProps<typeof rest>(rest, 'template')

  return (
    <Main {...sanitized} data-template={CollectionTemplate.template_id}>
      <Section>
        <Heading className='h2'>{title}</Heading>
        {body_html && <Paragraph>{body_html}</Paragraph>}
        <ProductGrid
          mt={24}
          products={products.map(product => ({
            product,
            product_link: handleProductLink(product)
          }))}
        />
      </Section>
    </Main>
  )
}

CollectionTemplate.displayName = 'CollectionTemplate'

CollectionTemplate.defaultProps = {
  products: []
}

CollectionTemplate.template_id = 'collection'
