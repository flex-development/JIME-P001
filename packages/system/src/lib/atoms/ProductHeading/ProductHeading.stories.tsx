import { ProductHeading } from '@system/lib'
import ASH_TRAY from '@system/tests/fixtures/api/products/ash-tray'
import type { ProductHeadingProps } from './ProductHeading.props'

/**
 * @file Stories - ProductHeading
 * @module lib/atoms/ProductHeading/stories
 */

export default {
  component: ProductHeading,
  parameters: {
    jest: ['ProductHeading']
  },
  title: 'Library/Atoms/Heading/ProductHeading'
}

export const AshTray: FCS<ProductHeadingProps> = args => (
  <ProductHeading {...args} />
)

AshTray.args = {
  price: ASH_TRAY.variants[0].price,
  title: ASH_TRAY.title
}
