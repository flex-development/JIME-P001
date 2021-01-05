import { SHOPIFY_POLARIS_ICONS } from '@system/config'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { FREC } from '@system/types'
import { forwardRef, SVGProps } from 'react'
import { IconProps } from './Icon.props'

/**
 * @file Implementation - Icon
 * @module lib/atoms/Icon/impl
 */

/**
 * Displays a Shopify Polaris icon.
 *
 * Renders a `svg` element with the class `icon`.
 *
 * - https://polaris-icons.shopify.com
 */
export const Icon: FREC<IconProps> = forwardRef((props, ref) => {
  const { $fill, $stroke, children, ...rest } = props

  const sanitized = useSanitizedProps<'svg', SVGProps<SVGElement>>(rest, {
    icon: true,
    [`icon-${$fill}`]: $fill,
    [`icon-stroke-${$stroke}`]: $stroke
  })

  const Component = SHOPIFY_POLARIS_ICONS[children || '']

  if (!Component) return null

  return <Component {...sanitized} data-polaris-icon={children} ref={ref} />
})

Icon.displayName = 'Icon'

Icon.defaultProps = {}
