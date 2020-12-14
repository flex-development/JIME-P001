import { ButtonVariant, ThemeColor } from '@flex-development/kustomzcore'
import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedProps } from '@system/types'
import { forwardRef, useEffect, useRef } from 'react'
import { animated } from 'react-spring'
import { IconProps } from '../Icon/Icon'

/**
 * @file Render an <a> element
 * @module components/ui/atoms/Link/impl
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/a
 */

export interface LinkProps extends MutatedProps<HTMLAnchorElement> {
  /**
   * If true, add the class `active`.
   *
   * - https://v5.getbootstrap.com/docs/5.0/components/navs
   *
   */
  active?: boolean

  /**
   * Create a button style link.
   *
   * - https://v5.getbootstrap.com/docs/5.0/components/buttons/#button-tags
   */
  btn?: false | ButtonVariant

  /**
   * Add a colorized link class.
   *
   * - https://v5.getbootstrap.com/docs/5.0/helpers/colored-links
   */
  color?: false | ThemeColor

  /**
   * Indicates that the user cannot interact with the link.
   */
  disabled?: boolean

  /**
   * If true, add the class `dropdown-item`.
   */
  dropdown?: boolean

  /**
   * The URL that the hyperlink points to. Links are not restricted to
   * HTTP-based URLs — they can use any URL scheme supported by browsers:
   *
   * - Sections of a page with fragment URLs
   * - Pieces of media files with media fragments
   * - Telephone numbers with `tel:` URLs
   * - Email addresses with `mailto:` URLs
   *
   * @default '#'
   */
  href?: string

  /**
   * Icon to render beside the element text.
   */
  icon?: IconProps

  /**
   * If true, add the class `nav-link`.
   *
   * See: https://v5.getbootstrap.com/docs/5.0/components/navs
   */
  nav?: boolean

  /**
   * If true, add the class `stretched-link`.
   *
   * See: https://v5.getbootstrap.com/docs/5.0/helpers/stretched-link
   */
  stretched?: boolean

  /**
   * Where to display the linked URL, as the name for a browsing context.
   * The following keywords have special meanings for where to load the URL:
   *
   * - `_self`: the current browsing context (HTML default)
   * - `_blank`: usually a new tab, but users can configure browsers to open a
   *   new window instead
   * - `_parent`: the parent browsing context of the current one. If no parent,
   *   behaves as `_self`
   * - `_top`: he topmost browsing context (the "highest" context that’s an
   *   ancestor of the current one). If no ancestors, behaves as `_self`
   */
  target?: '_self' | '_blank' | '_parent' | '_top'

  /**
   * If true, add the class `dropdown-toggle`.
   */
  toggle?: boolean
}

/**
 * Renders an `<a>` element with the class `link`.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/a
 * - https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement
 */
export const Link: FREC<LinkProps> = forwardRef((props, ref) => {
  const {
    active,
    btn,
    color,
    dropdown,
    href = '',
    nav,
    stretched,
    toggle,
    ...rest
  } = props

  const sanitized = useSanitizedProps<typeof rest, AnimatedFREC<'a'>>(
    { ...rest, children: rest.children || rest.title },
    {
      active,
      btn: btn && btn,
      [`btn-${btn}`]: btn,
      disabled: rest.disabled,
      'dropdown-item': dropdown,
      'dropdown-toggle': toggle,
      [`link-${color}`]: color,
      'nav-link': nav,
      'stretched-link': stretched
    }
  )

  const _href = useRef<string | undefined>(href)

  if (toggle) {
    sanitized['aria-expanded'] = rest['aria-expanded'] || false
    sanitized['data-toggle'] = 'dropdown'
    sanitized['role'] = 'button'
  }

  if (sanitized['onClick'] && _href.current === '#') _href.current = undefined

  useEffect(() => {
    _href.current = href
  }, [href])

  return <animated.a {...sanitized} href={_href.current} ref={ref} />
})

Link.displayName = 'Link'

Link.defaultProps = {
  href: '#'
}
