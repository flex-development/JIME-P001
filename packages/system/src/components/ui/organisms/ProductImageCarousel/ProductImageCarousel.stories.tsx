import { PRODUCTS } from '@system-mocks/utils'
import { StoryFN } from '@system/types/storybook'
import { IProductListing } from 'shopify-api-node'
import {
  ProductImageCarousel,
  ProductImageCarouselProps
} from './ProductImageCarousel'

/**
 * @file Stories - ProductImageCarousel
 * @module components/ui/organisms/ProductImageCarousel/stories
 */

export default {
  argTypes: {
    children: { control: 'array' }
  },
  args: {
    style: {
      maxHeight: '600px',
      maxWidth: '438px'
    }
  },
  component: ProductImageCarousel,
  parameters: {
    jest: ['ProductImageCarousel', 'Carousel']
  },
  title: 'Library/Organisms/ProductImageCarousel'
}

export const AshTray: StoryFN<ProductImageCarouselProps> = (
  args: ProductImageCarouselProps
) => <ProductImageCarousel {...args} />

const ash_tray = PRODUCTS.find(p => p.handle === 'ash-tray') as IProductListing

AshTray.args = {
  images: ash_tray.images,
  product_title: ash_tray.title,
  variants: ash_tray.variants
}

export const Kustomz: StoryFN<ProductImageCarouselProps> = (
  args: ProductImageCarouselProps
) => <ProductImageCarousel {...args} />

const kustomz = PRODUCTS.find(p => p.handle === 'kustomz') as IProductListing

Kustomz.args = {
  images: kustomz.images,
  product_title: kustomz.title,
  variants: kustomz.variants
}

export const RollingTray: StoryFN<ProductImageCarouselProps> = (
  args: ProductImageCarouselProps
) => <ProductImageCarousel {...args} />

const rolling_tray = PRODUCTS.find(
  p => p.handle === 'rolling-tray'
) as IProductListing

RollingTray.args = {
  images: rolling_tray.images,
  position: rolling_tray.images.length - 1,
  product_title: rolling_tray.title,
  variants: rolling_tray.variants
}
