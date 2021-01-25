import { a } from '@react-spring/web'
import { IMAGE_PLACEHOLDER_URL } from '@system/config/constants'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { AnimatedFREC, FREC } from '@system/types'
import omit from 'lodash/omit'
import { forwardRef } from 'react'
import type { ImageProps } from './Image.props'

/**
 * @file Implementation - Image
 * @module lib/atoms/Image/impl
 */

/**
 * Renders an `<img>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/img
 * - https://developer.mozilla.org/docs/Web/API/HTMLImageElement
 */
export const Image: FREC<ImageProps> = forwardRef((props, ref) => {
  const { $fluid, ...rest } = props

  const sanitized = useSanitizedProps<'img'>(rest, { 'img-fluid': $fluid })

  /* eslint-disable-next-line jsx-a11y/alt-text */
  return <img {...omit(sanitized, 'children')} ref={ref} />
})

Image.displayName = 'Image'

Image.defaultProps = {
  alt: '',
  src: IMAGE_PLACEHOLDER_URL
}

export const ImageAnimated: AnimatedFREC<ImageProps> = a(Image)

ImageAnimated.displayName = 'ImageAnimated'

ImageAnimated.defaultProps = Image.defaultProps
