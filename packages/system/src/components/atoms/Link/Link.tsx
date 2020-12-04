import { ButtonVariant, ThemeColor } from '@flex-development/kustomzcore'
import { useIcon, useMutatedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import { IconProps } from '../Icon/Icon'

/**
 * @file Render an <a> element
 * @module components/atoms/Link/impl
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
 * Link component properties without the `ref` property.
 */
export type ReflessLinkProps = PropsWithoutRef<LinkProps>

/**
 * Ref attributes for `<a>` elements.
 */
export type LinkRefAttributes = RefAttributes<HTMLAnchorElement>

/**
 * {@link Link} component forward ref properties.
 */
export type LinkRefProps = ReflessLinkProps & LinkRefAttributes

/**
 * Renders an `<a>` element with the class `link`.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/a
 * - https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement
 */
export const Link: FREC<LinkRefProps> = forwardRef((props, ref) => {
  const {
    active,
    btn,
    color,
    dropdown,
    nav,
    stretched,
    toggle,
    ...rest
  } = props

  const withIcon = useIcon<LinkProps>({
    ...rest,
    children: rest.children || rest.title
  })

  const mutated = useMutatedProps<typeof withIcon, JSX.IntrinsicElements['a']>(
    withIcon,
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

  if (toggle) {
    mutated['aria-expanded'] = rest['aria-expanded'] || false
    mutated['data-toggle'] = 'dropdown'
    mutated.role = 'button'
  }

  if (mutated.onClick && mutated.href === '#') delete mutated.href

  return (
    <a {...mutated} ref={ref}>
      {mutated.children}
    </a>
  )
})

Link.displayName = 'Link'

Link.defaultProps = {
  href: '#'
}
