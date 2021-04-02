import ASH_TRAY from '@system/tests/fixtures/api/products/ash-tray'
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

AshTray.args = {
  product: ASH_TRAY,
  variant: ASH_TRAY.variants[0]
}

export const Placeholder: FCS<ProductImageProps> = args => <AshTray {...args} />

Placeholder.args = {
  product: ASH_TRAY,
  variant: ASH_TRAY.variants[ASH_TRAY.variants.length - 1]
}
