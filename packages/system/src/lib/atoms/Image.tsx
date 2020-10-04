import { NullishString } from '@flex-development/kustomtypez'
import { useMutatedProps } from '@kustomz/hooks'
import { MutatedVoidElementProps } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'

/**
 * @module lib/elements/Image
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/img
 */

/**
 * Image component properties.
 */
export interface ImageProps extends MutatedVoidElementProps<HTMLImageElement> {
  /**
   * Defines an alternative text description of the image.
   *
   * Omitting alt altogether indicates that the image is a key part of the
   * content and no textual equivalent is available.
   *
   * Setting this attribute to an empty string (`alt=""`) indicates that this
   * image is not a key part of the content (it’s decoration or a tracking
   * pixel), and that non-visual browsers may omit it from rendering.
   *
   * Visual browsers will also hide the broken image icon if the alt is empty
   * and the image failed to display.
   *
   * This attribute is also used when copying and pasting the image to text, or
   * saving a linked image to a bookmark.
   */
  alt?: NullishString

  /**
   * Make an image responsive.
   */
  fluid?: boolean

  /**
   * Indicates that the element is not yet, or is no longer, relevant.
   *
   * For example, it can be used to hide elements of the page that can't be used
   * until the login process has been completed. The browser won't render such
   * elements.
   *
   * This attribute must not be used to hide content that could legitimately be
   * shown.
   */
  hidden?: boolean

  /**
   * Add the class `rounded`.
   */
  rounded?: boolean

  /**
   * One or more strings separated by commas, indicating a set of source sizes.
   *
   * Each source size consists of:
   *
   * 1. A media condition. This must be omitted for the last item in the list.
   * 2. A source size value.
   *
   * Source size values specify the intended display size of the image. User
   * agents use the current source size to select one of the sources supplied by
   * the srcset attribute.
   */
  sizes?: string

  /**
   * The image URL. Mandatory for the `<img>` element.
   *
   * On browsers supporting `srcSet`, `src` is treated like a candidate image
   * with a pixel density descriptor 1x, unless an image with this pixel density
   * descriptor is already defined in `srcSet`, or unless `srcSet` contains w
   * descriptors.
   *
   * @default '#'
   */
  src: string

  /**
   * One or more strings separated by commas, indicating possible image sources
   * for the user agent to use.
   *
   * Each string is composed of:
   *
   * - A URL to an image
   * - Optionally, whitespace followed by one of
   *   - A width descriptor (a positive integer directly followed by `w`). The
   *     width descriptor is divided by the source size given in the `sizes`
   *     attribute to calculate the effective pixel density
   *   - A pixel density descriptor (a positive floating point number directly
   *     followed by `x`)
   */
  srcSet?: string

  /**
   * Add the class `img-thumbnail`.
   */
  thumbnail?: boolean
}

/**
 * Image component properties without the `ref` property.
 */
export type ReflessImageProps = PropsWithoutRef<ImageProps>

/**
 * Ref attributes for `<img>` elements.
 */
export type ImageRefAttributes = RefAttributes<HTMLImageElement>

/**
 * {@link Image} component forward ref properties.
 */
export type ImageRefProps = ReflessImageProps & ImageRefAttributes

/**
 * Renders an `<img>` element with the class `img`.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/img**
 * - **https://v5.getbootstrap.com/docs/5.0/content/images/**
 */
export const Image: FREC<ImageRefProps> = forwardRef((props, ref) => {
  const { fluid, rounded, thumbnail, ...rest } = props

  const mutatedProps = useMutatedProps<
    typeof rest,
    JSX.IntrinsicElements['img']
  >(rest, {
    img: true,
    'img-fluid': fluid,
    'img-thumbnail': thumbnail,
    rounded
  })

  /* eslint-disable-next-line jsx-a11y/alt-text */

  return <img {...mutatedProps} ref={ref} />

  /* eslint-enable jsx-a11y/alt-text */
})
