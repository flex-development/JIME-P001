import { Image, ImageProps } from '@system/components/atoms'
import { useSanitizedProps } from '@system/hooks'
import { getProductVariantImage } from '@system/utils'
import { omit } from 'lodash'
import { FC, useEffect } from 'react'
import { useArray } from 'react-hanger/array/useArray'
import { IProductListing } from 'shopify-api-node'
import { Carousel, CarouselProps } from '../Carousel'

/**
 * @file Slideshow component for cycling through product images
 * @module components/organisms/ProductImageCarousel/impl
 */

export interface ProductImageCarouselProps
  extends Omit<CarouselProps, 'children'> {
  /**
   * Array of product images to display.
   *
   * @default []
   */
  images?: IProductListing['images']

  /**
   * Title of product.
   */
  product_title: IProductListing['title']

  /**
   * Array of product variants.
   *
   * @default []
   */
  variants?: IProductListing['variants']
}

/**
 * Slideshow component for cycling through product images.
 * Renders a `Carousel` component with the class `product-image-carousel`.
 */
export const ProductImageCarousel: FC<ProductImageCarouselProps> = (
  props: ProductImageCarouselProps
) => {
  const { images = [], product_title, variants = [], ...rest } = props

  // Get component properties
  const sanitized = useSanitizedProps<typeof rest>(
    rest,
    'product-image-carousel'
  )

  // Initialize carousel slides state
  const [slides, { setValue: setSlides }] = useArray<ImageProps>([])

  // Get carousel data
  useEffect(() => {
    const carousel_slides: Array<ImageProps> = []

    images.forEach(({ id }) => {
      const variant = variants.find(({ image_id }) => image_id === id)

      const image = getProductVariantImage(
        variant?.image_id || null,
        images,
        variant ? `${product_title} - ${variant?.title}` : product_title
      )

      if (image.height) image['data-height'] = image.height
      if (image.width) image['data-width'] = image.width

      carousel_slides.push(omit(image, ['height', 'width']))
    })

    setSlides(carousel_slides)
  }, [images, product_title, setSlides, variants])

  return (
    <Carousel {...sanitized}>
      {slides.map(slide => (
        <Image {...slide} className='d-block w-100' key={slide.id} />
      ))}
    </Carousel>
  )
}

ProductImageCarousel.displayName = 'ProductImageCarousel'

ProductImageCarousel.defaultProps = {
  images: [],
  position: 0,
  variants: []
}
