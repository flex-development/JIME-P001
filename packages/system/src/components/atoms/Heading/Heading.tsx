import { useSanitizedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import {
  DetailedHTMLProps,
  forwardRef,
  ForwardRefExoticComponent as FREC,
  HTMLAttributes,
  PropsWithoutRef,
  RefAttributes
} from 'react'

/**
 * @module components/atoms/Heading/impl
 * @see
 * {@link https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements}
 */

export interface HeadingProps extends MutatedProps<HTMLHeadingElement> {
  /**
   * Heading size.
   *
   * @default 1
   */
  size?: 1 | 2 | 3 | 4 | 5 | 6
}

/**
 * Heading component properties without the `ref` property.
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
 * Renders a `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, or `<h6>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements
 * - https://developer.mozilla.org/docs/Web/API/HTMLHeadingElement
 */
export const Heading: FREC<HeadingRefProps> = forwardRef((props, ref) => {
  const { size, ...rest } = props

  const sanitized = useSanitizedProps<
    typeof rest,
    DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
  >({ ...rest, ref })

  /* eslint-disable jsx-a11y/heading-has-content */

  switch (size) {
    case 2:
      return <h2 {...sanitized} />
    case 3:
      return <h3 {...sanitized} />
    case 4:
      return <h4 {...sanitized} />
    case 5:
      return <h5 {...sanitized} />
    case 6:
      return <h6 {...sanitized} />
    default:
      return <h1 {...sanitized} />
  }

  /* eslint-enable jsx-a11y/heading-has-content */
})

Heading.displayName = 'Heading'

Heading.defaultProps = {
  size: 1
}
