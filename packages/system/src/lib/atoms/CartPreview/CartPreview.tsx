import { useSpring } from '@react-spring/web'
import { useCartContext, useSanitizedProps } from '@system/hooks'
import type { FREC } from '@system/types'
import { forwardRef } from 'react'
import { usePrevious } from 'react-hanger/usePrevious'
import { Link, LinkProps } from '../Link'
import { Span } from '../Span'
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
  const { $color, target = '_blank', ...rest } = props

  // Access number of items in user's cart
  const { items_total } = useCartContext()

  // Get reference to previous number of items in cart
  const prev_total = usePrevious<number>(items_total)

  // Animate items total decrease/increase
  const { total } = useSpring({
    from: { total: prev_total },
    total: items_total
  })

  // Get component properties
  const sanitized = useSanitizedProps<'a', LinkProps>(rest, 'cart-preview')

  return (
    <Link
      {...sanitized}
      $color={$color}
      data-items={total}
      target={target}
      ref={ref}
    >
      Cart&nbsp;&nbsp;/&nbsp;&nbsp;
      <Span>
        <Span>{total}</Span> {`Item${items_total === 1 ? '' : 's'}`}
      </Span>
    </Link>
  )
})

CartPreview.displayName = 'CartPreview'

CartPreview.defaultProps = {
  href: '/cart'
}
