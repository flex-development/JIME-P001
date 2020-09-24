import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import { TextContentProps } from '../declarations'
import { useMutatedProps, useTextContentDictionary } from '../modules/hooks'

/**
 * @module lib/elements/Link
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/a}
 */

/* eslint-disable prettier/prettier */

/**
 * {@link Link} component properties.
 */
export interface LinkProps extends TextContentProps<HTMLAnchorElement> {

  /* eslint-enable prettier/prettier */

  /**
   * If true, add the class `active`.
   *
   * - https://v5.getbootstrap.com/docs/5.0/components/navs/
   *
   */
  active?: boolean

  /* eslint-enable prettier/prettier */

  /**
   * If true, style link for `Card` component.
   *
   * - https://v5.getbootstrap.com/docs/5.0/components/card/#titles-text-and-links
   *
   */
  card?: boolean

  /**
   * Link color.
   *
   * - https://v5.getbootstrap.com/docs/5.0/helpers/colored-links/
   *
   * @default false
   */
  color?: TextContentProps['color']

  /**
   * Indicates that the user cannot interact with the link.
   */
  disabled?: boolean

  /**
   * If true, add the class `dropdown-item`.
   *
   * @default false
   */
  dropdown?: boolean

  /**
   * Path to page to render to URL object.
   *
   * - https://nodejs.org/api/url.html#url_url_strings_and_url_objects
   *
   * @default '#'
   */
  href?: string

  /**
   * Menu links to render.
   *
   * @default []
   */
  links?: Partial<LinkProps>[]

  /**
   * If true, add the class `nav-link`.
   *
   * - https://v5.getbootstrap.com/docs/5.0/components/navs/
   */
  nav?: boolean

  /**
   * Link size.
   *
   * @default false
   */
  size?: TextContentProps['size']

  /**
   * If true, add the class `stretched-link`.
   *
   * - https://v5.getbootstrap.com/docs/5.0/helpers/stretched-link/
   *
   * @default false
   */
  stretched?: boolean

  /**
   * Where to display the linked URL, as the name for a browsing context.
   * The following keywords have special meanings for where to load the URL:
   *
   * - `_self`: the current browsing context
   * - `_blank`: usually a new tab, but users can configure browsers to open a
   *   new window instead
   * - `_parent`: the parent browsing context of the current one. If no parent,
   *   behaves as `_self`
   * - `_top`: he topmost browsing context (the "highest" context that’s an
   *   ancestor of the current one). If no ancestors, behaves as `_self`
   *
   * @default '_self'
   */
  target?: '_self' | '_blank' | '_parent' | '_top'

  /**
   * If true, add the class `dropdown-toggle`.
   *
   * @default false
   */
  toggle?: boolean
}

/**
 * {@link Link} component properties without the `ref` property.
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
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/a**
 * - **https://nextjs.org/docs/api-reference/next/link**
 */
export const Link: FREC<LinkRefProps> = forwardRef((props, ref) => {
  const { active, card, dropdown, nav, stretched, toggle, ...rest } = props

  const { dictionary, sanitized } = useTextContentDictionary<typeof rest>(
    rest,
    nav ? 'nav-link' : 'link'
  )

  const mutatedProps = useMutatedProps<
    typeof sanitized,
    JSX.IntrinsicElements['a']
  >(sanitized, {
    ...dictionary,
    active,
    'card-link': card,
    disabled: rest.disabled && rest.disabled,
    'dropdown-item': dropdown,
    'dropdown-toggle': toggle,
    'stretched-link': stretched
  })

  if (toggle) {
    mutatedProps['aria-expanded'] = false
    mutatedProps['data-toggle'] = 'dropdown'
    mutatedProps['role'] = 'button'
  }

  return (
    <a {...mutatedProps} ref={ref}>
      {mutatedProps.children || mutatedProps.title}
    </a>
  )
})

Link.defaultProps = {
  card: false,
  color: false,
  dropdown: false,
  href: '#',
  nav: false,
  size: false
}
