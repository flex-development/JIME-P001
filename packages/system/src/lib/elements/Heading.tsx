import { GlobalProps, ThemeColor } from '@kustomz/types'
import React, {
  DetailedHTMLProps,
  forwardRef,
  ForwardRefExoticComponent as FREC,
  HTMLAttributes,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import { useMutatedProps, useTextUtilities } from '../hooks'

/**
 * @module lib/elements/Heading
 * @see
 * {@link https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements}
 */

/**
 * {@link Heading} component properties.
 */
export interface HeadingProps extends GlobalProps<HTMLHeadingElement> {
  /**
   * Heading color.
   *
   * @default false
   */
  color?: ThemeColor | boolean

  /**
   * Heading size.
   *
   * @default 1
   */
  size?: 1 | 2 | 3 | 4 | 5 | 6
}

/**
 * {@link Heading} component properties without the `ref` property.
 */
export type ReflessHeadingProps = PropsWithoutRef<HeadingProps>

/**
 * Ref attributes for `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, and `<h6>`
 * elements.
 */
export type HeadingRefAttributes = RefAttributes<HTMLHeadingElement>

/**
 * {@link Heading} component forward ref properties.
 */
export type HeadingRefProps = ReflessHeadingProps & HeadingRefAttributes

/**
 * Renders a `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, or `<h6>` element with the
 * class `heading`.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements**
 */
export const Heading: FREC<HeadingRefProps> = forwardRef((props, ref) => {
  const { size, ...rest } = props

  const { dictionary, sanitized } = useTextUtilities<typeof rest>(
    rest,
    'heading'
  )

  const mutatedProps = useMutatedProps<
    typeof sanitized,
    DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
  >({ ...sanitized, ref }, dictionary)

  /* eslint-disable jsx-a11y/heading-has-content */

  switch (size) {
    case 2:
      return <h2 {...mutatedProps} />
    case 3:
      return <h3 {...mutatedProps} />
    case 4:
      return <h4 {...mutatedProps} />
    case 5:
      return <h5 {...mutatedProps} />
    case 6:
      return <h6 {...mutatedProps} />
    default:
      return <h1 {...mutatedProps} />
  }

  /* eslint-enable jsx-a11y/heading-has-content */
})

Heading.defaultProps = {
  children: 'The quick brown fox jumps over the lazy dog',
  color: false,
  size: 1
}
