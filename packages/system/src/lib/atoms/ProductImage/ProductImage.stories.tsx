import type { IProductListing } from '@flex-development/kustomzcore'
import { PRODUCTS } from '@system-mocks/utils'
import { ProductImage } from './ProductImage'
import type { ProductImageProps } from './ProductImage.props'

/**
 * @file Stories - ProductImage
 * @module lib/atoms/ProductImage/stories
 */

export default {
  component: ProductImage,
  parameters: {
    jest: ['ProductImage']
  },
  title: 'Library/Atoms/Image/ProductImage'
}

export const AshTray: FCS<ProductImageProps> = args => (
  <div style={{ maxWidth: '438px' }}>
    <ProductImage {...args} />
  </div>
)

const ashtray = PRODUCTS.find(p => p.handle === 'ash-tray') as IProductListing

AshTray.args = {
  product: ashtray,
  variant: ashtray.variants[0]
}

export const Placeholder: FCS<ProductImageProps> = args => <AshTray {...args} />

Placeholder.args = {
  product: ashtray,
  variant: ashtray.variants[ashtray.variants.length - 1]
}
