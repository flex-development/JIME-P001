import { useSanitizedProps } from '@system/hooks'
import { FREC } from '@system/types'
import { isEmpty } from 'lodash'
import { forwardRef } from 'react'
import { usePrevious } from 'react-hanger'
import { config, Spring, SpringConfig } from 'react-spring'
import { Link, LinkProps, Span } from '../../atoms'

/**
 * @file Display the number of items a user's cart
 * @module components/molecules/CartPreview/impl
 */

export interface CartPreviewProps extends LinkProps {
  /**
   * URL to redirect the user to when the cart preview link is clicked.
   *
   * @default '/cart'
   */
  href?: LinkProps['href']

  /**
   * Number of items in the user's cart.
   *
   * @default 0
   */
  items?: number

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
  const { items = 0, spring, ...rest } = props

  // Get spring animation config
  const _spring = !spring || isEmpty(spring) ? config.stiff : spring
  if (!_spring['mass']) _spring['mass'] = 1

  // Get reference to previous number of items in cart
  const items_prev = usePrevious<number>(items)

  // Get component properties
  const sanitized = useSanitizedProps<typeof rest, LinkProps>(
    { ...rest, target: rest.target || '_blank' },
    'cart-preview'
  )

  return (
    <Link {...sanitized} data-items={items} ref={ref}>
      Cart&nbsp;&nbsp;/&nbsp;&nbsp;
      <Span>
        <Spring config={_spring} from={{ items: items_prev }} to={{ items }}>
          {props => (
            <>
              <Span>{props.items}</Span> {`Item${items === 1 ? '' : 's'}`}
            </>
          )}
        </Spring>
      </Span>
    </Link>
  )
})

CartPreview.displayName = 'CartPreview'

CartPreview.defaultProps = {
  href: '/cart',
  items: 0
}
