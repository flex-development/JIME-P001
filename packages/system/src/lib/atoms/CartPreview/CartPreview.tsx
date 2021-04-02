import { EMPTY_SPACE } from '@kustomzcore/config/constants'
import { useSpring } from '@react-spring/web'
import { useCartContext, useSanitizedProps } from '@system/hooks'
import type { LinkProps } from '@system/lib/atoms/Link'
import { Link } from '@system/lib/atoms/Link'
import { Span, SpanAnimated } from '@system/lib/atoms/Span'
import type { FREC } from '@system/types'
import { forwardRef } from 'react'
import { usePrevious } from 'react-hanger/usePrevious'
import type { CartPreviewProps } from './CartPreview.props'

/**
 * @file Implementation - CartPreview
 * @module lib/atoms/CartPreview/impl
 */

/**
 * Displays the number of items in the user's cart.
 * Renders a `Link` component with the class `cart-preview`.
 */
export const CartPreview: FREC<CartPreviewProps> = forwardRef((props, ref) => {
  const { $color, ...rest } = props

  // Access number of items in user's cart
  const { items_total: total } = useCartContext()

  // Get reference to previous number of items in cart
  const ptotal = usePrevious<number>(total)

  // Animate items total decrease/increase
  const { total: total_spring_value } = useSpring({
    from: { total: ptotal },
    total
  })

  // Get component properties
  const sanitized = useSanitizedProps<'a', LinkProps>(rest, 'cart-preview')

  return (
    <Link {...sanitized} $color={$color} ref={ref}>
      Cart&nbsp;&nbsp;<Span className='cart-preview-divider'>/</Span>
      &nbsp;&nbsp;
      <Span className='cart-preview-items'>
        <SpanAnimated>{total_spring_value}</SpanAnimated>
        {EMPTY_SPACE}
        {`Item${total === 1 ? '' : 's'}`}
      </Span>
    </Link>
  )
})

CartPreview.displayName = 'CartPreview'

CartPreview.defaultProps = {
  href: '/cart',
  target: '_blank'
}
