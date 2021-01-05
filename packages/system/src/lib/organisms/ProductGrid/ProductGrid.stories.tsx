import { PRODUCTS } from '@system-mocks/utils'
import { ProductGrid } from './ProductGrid'
import { ProductGridProps } from './ProductGrid.props'

/**
 * @file Stories - ProductGrid
 * @module lib/organisms/ProductGrid/stories
 */

export default {
  args: {
    style: {
      maxWidth: '1410px'
    }
  },
  component: ProductGrid,
  parameters: {
    jest: ['ProductGrid']
  },
  title: 'Library/Organisms/ProductGrid'
}

export const Default: FCS<ProductGridProps> = args => <ProductGrid {...args} />

Default.args = {
  products: PRODUCTS
}
