import { Link, LinkProps, Span } from '@system/components/ui/atoms'
import { useCartContext, useSanitizedProps } from '@system/hooks'
import { FREC } from '@system/types'
import { isEmpty } from 'lodash'
import { forwardRef } from 'react'
import { usePrevious } from 'react-hanger'
import { config, SpringConfig, useSpring } from 'react-spring'

/**
 * @file Display the number of items a user's cart
 * @module components/ui/molecules/CartPreview/impl
 */

export interface CartPreviewProps extends LinkProps {
  /**
   * URL to redirect the user to when the cart preview link is clicked.
   *
   * @default '/cart'
   */
  href?: LinkProps['href']

  /**
   * `Spring` animation configuration.
   *
   * - https://www.react-spring.io/docs/hooks/api
   */
  spring?: SpringConfig
}

/**
 * Displays the number of items in the user's cart.
 *
 * Renders a `Link` component with the class `cart-preview`.
 */
export const CartPreview: FREC<CartPreviewProps> = forwardRef((props, ref) => {
  const { items_total } = useCartContext()

  const { spring, ...rest } = props

  // Get spring animation config
  const _spring = !spring || isEmpty(spring) ? config.stiff : spring
  if (!_spring['mass']) _spring['mass'] = 1

  // Get reference to previous number of items in cart
  const prev_total = usePrevious<number>(items_total)

  // Animate items total decrease/increase
  const { total } = useSpring({
    from: { total: prev_total },
    total: items_total
  })

  // Get component properties
  const sanitized = useSanitizedProps<typeof rest, LinkProps>(
    { ...rest, target: rest.target || '_blank' },
    'cart-preview'
  )

  return (
    <Link {...sanitized} data-items={total} ref={ref}>
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
