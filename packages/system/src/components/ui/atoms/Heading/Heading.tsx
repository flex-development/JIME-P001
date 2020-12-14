import { useSanitizedProps } from '@system/hooks'
import { FREC, MutatedProps } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'

/**
 * @module components/ui/atoms/Heading/impl
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
 * Renders a `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, or `<h6>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements
 * - https://developer.mozilla.org/docs/Web/API/HTMLHeadingElement
 */
export const Heading: FREC<HeadingProps> = forwardRef((props, ref) => {
  const { size, ...rest } = props

  const sanitized = useSanitizedProps<typeof rest>({ ...rest, ref })

  switch (size) {
    case 2:
      return <animated.h2 {...sanitized} />
    case 3:
      return <animated.h3 {...sanitized} />
    case 4:
      return <animated.h4 {...sanitized} />
    case 5:
      return <animated.h5 {...sanitized} />
    case 6:
      return <animated.h6 {...sanitized} />
    default:
      return <animated.h1 {...sanitized} />
  }
})

Heading.displayName = 'Heading'

Heading.defaultProps = {
  size: 1
}
