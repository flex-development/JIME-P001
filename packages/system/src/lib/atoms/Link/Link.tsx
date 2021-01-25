import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import type { LinkProps } from './Link.props'

/**
 * @file Implementation - Link
 * @module lib/atoms/Link/impl
 */

/**
 * Renders an `<a>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/a
 * - https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement
 */
export const Link: FREC<LinkProps> = forwardRef((props, ref) => {
  const {
    $active,
    $btn,
    $color,
    $dropdown,
    $fluid,
    $menu,
    disabled,
    ...rest
  } = props

  const sanitized = useSanitizedProps<'a'>(
    {
      ...rest,
      children: rest.children || rest.title,
      role: $btn ? 'button' : rest.role
    },
    {
      active: $active,
      [`btn btn-${$btn}`]: $btn,
      disabled,
      'dropdown-item': typeof $dropdown === 'boolean' && $dropdown,
      'dropdown-toggle': $dropdown === 'toggle',
      [`link-${$color}`]: $color,
      'link-fluid': $fluid,
      'menu-link': $menu
    }
  )

  // Prevent tab nabbing and support older versions of Firefox
  if (sanitized['target'] === '_blank') sanitized['rel'] = 'noopener noreferrer'

  // Add additional properties if rendering `Dropdown` toggle link
  if ($dropdown === 'toggle') {
    sanitized['aria-expanded'] = rest['aria-expanded'] || false
    sanitized['data-toggle'] = 'dropdown'
    sanitized['role'] = 'button'
  }

  /* eslint-disable jsx-a11y/anchor-has-content */
  return (
    <a
      {...sanitized}
      href={sanitized['onClick'] && rest.href === '#' ? undefined : rest.href}
      ref={ref}
    />
  )
})

Link.displayName = 'Link'

Link.defaultProps = {
  href: '#'
}

export const LinkAnimated: AnimatedFREC<LinkProps> = a(Link)

LinkAnimated.displayName = 'LinkAnimated'

LinkAnimated.defaultProps = Link.defaultProps
