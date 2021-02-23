import type { AnyObject } from '@flex-development/json'
import type { IProductListing, IProductListingVariant } from '@kustomzcore'
import type { GlobalAttributes, Merge, TransientProps } from '@system/types'
import type { ImageProps as NextImageProps } from 'next/image'

/**
 * @file Component Props - ProductImage
 * @module lib/atoms/ProductImage/props
 */

export type ProductImageProps = ProductImagePropsBase & {
  /**
   * The layout behavior of the image as the viewport changes size.
   *
   * - https://nextjs.org/docs/api-reference/next/image#layout
   *
   * @default 'responsive'
   */
  layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive'

  /**
   * Shopify product listing data.
   */
  product: IProductListing

  /**
   * Shopify product listing variant data.
   */
  variant?: IProductListingVariant | AnyObject
}

export type ProductImagePropsBase = Merge<
  Pick<
    NextImageProps,
    | 'loading'
    | 'priority'
    | 'quality'
    | 'objectFit'
    | 'objectPosition'
    | 'unoptimized'
  >,
  GlobalAttributes<HTMLImageElement> & TransientProps
>
