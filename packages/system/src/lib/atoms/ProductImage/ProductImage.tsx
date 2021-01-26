import type { IProductListingVariant } from '@flex-development/kustomzcore'
import { getSizedImageUrl } from '@shopify/theme-images'
import {
  IMAGE_PLACEHOLDER_URL,
  PRODUCT_IMAGE_DEFAULT as DEFAULT_IMAGE
} from '@system/config/constants'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import merge from 'lodash/merge'
import omit from 'lodash/omit'
import type { ImageLoader, ImageProps as NextImageProps } from 'next/image'
import NextImage from 'next/image'
import type { FC } from 'react'
import { useCallback, useMemo } from 'react'
import type { ProductImageProps } from './ProductImage.props'

/**
 * @file Implementation - ProductImage
 * @module lib/atoms/ProductImage/impl
 */

/**
 * Displays a product image with image optimization enabled.
 *
 * - https://nextjs.org/docs/basic-features/image-optimization
 * - https://nextjs.org/docs/api-reference/next/image
 */
export const ProductImage: FC<ProductImageProps> = props => {
  const { product, variant, ...rest } = props

  // Attach base className and process transient props
  const sanitized = useSanitizedProps<'img', NextImageProps>(rest, {
    'product-img': true
  })

  // Product image state
  const image = useMemo<NextImageProps>(() => {
    const { image_id, title } = variant || ({} as IProductListingVariant)

    const img = product.images.find(img => img.id === image_id) || DEFAULT_IMAGE

    const o_keys = [
      'created_at',
      'position',
      'product_id',
      'updated_at',
      'variant_ids'
    ]

    return merge(omit(img, o_keys), {
      alt: (() => {
        if (img?.alt) return img.alt

        if (!variant || !Object.keys(variant).length) product.title
        return `${product.title} - ${title}`
      })(),
      'data-position': img.position,
      'data-product-id': img.product_id,
      height: rest?.layout === 'fill' ? (undefined as never) : img.height,
      width: rest?.layout === 'fill' ? (undefined as never) : img.width
    }) as NextImageProps
  }, [product.images, product.title, rest?.layout, variant])

  /**
   * Resolves product image URLs.
   *
   * @param resolverProps - Image resolver props
   * @param resolverProps.src - Image source URL
   * @param resolverProps.width - Image width, or undefined
   */
  const loader: ImageLoader = ({ src, width }) => {
    const size = width ? `${width}x${width}` : 'master'
    return getSizedImageUrl(src, size) || IMAGE_PLACEHOLDER_URL
  }

  /* Callback version of `loader` */
  const loaderCB = useCallback(loader, [])

  return <NextImage {...merge(sanitized, image)} loader={loaderCB} />
}

ProductImage.displayName = 'ProductImage'

ProductImage.defaultProps = {
  layout: 'responsive'
}
