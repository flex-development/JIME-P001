import { PRODUCTS } from '@system-mocks/utils'
import {
  Heading,
  ProductHeading,
  ProductHeadingProps
} from '@system/components'
import { StoryFN } from '@system/types/storybook'
import { IProductListing } from 'shopify-api-node'

/**
 * @file Stories - ProductHeading
 * @module components/ui/molecules/ProductHeading/stories
 */

export default {
  argTypes: {
    size: {
      control: {
        options: [1, 2, 3, 4, 5, 6],
        type: 'select'
      }
    }
  },
  component: ProductHeading,
  parameters: {
    jest: ['ProductHeading']
  },
  subcomponents: { Heading },
  title: 'Library/Molecules/ProductHeading'
}

export const AshTray: StoryFN<ProductHeadingProps> = (
  args: ProductHeadingProps
) => <ProductHeading {...args} />

const ash_tray_data = PRODUCTS.find(
  p => p.handle === 'ash-tray'
) as IProductListing

AshTray.args = {
  price: ash_tray_data.variants[0].price,
  title: ash_tray_data.title
}
