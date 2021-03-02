import type { IProductListing } from '@kustomzcore/types'
import { PRODUCTS } from '@tests/system/__mocks__/utils'
import { ProductCard } from './ProductCard'
import type { ProductCardProps } from './ProductCard.props'

/**
 * @file Stories - ProductCard
 * @module lib/molecules/ProductCard/stories
 */

export default {
  args: {
    style: {
      maxWidth: '438px'
    }
  },
  component: ProductCard,
  parameters: {
    jest: ['ProductCard']
  },
  title: 'Library/Molecules/ProductCard'
}

export const AshTray: FCS<ProductCardProps> = args => <ProductCard {...args} />

AshTray.args = {
  product: PRODUCTS.find(p => p.handle === 'ash-tray') as IProductListing
}

export const Kustomz: FCS<ProductCardProps> = args => <ProductCard {...args} />

Kustomz.args = {
  product: PRODUCTS.find(p => p.handle === 'kustomz') as IProductListing
}
