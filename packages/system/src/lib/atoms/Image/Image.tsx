import { a } from '@react-spring/web'
import { IMAGE_PLACEHOLDER_URL } from '@system/config/constants'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { FREC } from '@system/types'
import omit from 'lodash/omit'
import { forwardRef } from 'react'
import { ImageProps } from './Image.props'

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

  // Get component properties
  const sanitized = useSanitizedProps<'img'>(rest, { 'img-fluid': $fluid })

  return <a.img {...omit(sanitized, 'children')} ref={ref} />
})

Image.displayName = 'Image'

Image.defaultProps = {
  alt: '',
  src: IMAGE_PLACEHOLDER_URL
}
