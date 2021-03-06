import type { IProductListing } from '@kustomzcore/types'
import { ProductHeading } from '@system/lib'
import { PRODUCTS } from '@tests/system/__mocks__/utils'
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

const ash_tray_data = PRODUCTS.find(
  p => p.handle === 'ash-tray'
) as IProductListing

AshTray.args = {
  price: ash_tray_data.variants[0].price,
  title: ash_tray_data.title
}
