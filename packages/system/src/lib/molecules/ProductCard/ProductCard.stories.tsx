import ASH_TRAY from '@system/tests/fixtures/api/products/ash-tray'
import KUSTOMZ from '@system/tests/fixtures/api/products/kustomz'
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
  product: ASH_TRAY
}

export const Kustomz: FCS<ProductCardProps> = args => <ProductCard {...args} />

Kustomz.args = {
  product: KUSTOMZ
}
