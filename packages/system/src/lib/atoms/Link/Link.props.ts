import type { ButtonProps } from '@system/lib/atoms/Button'
import type { Color, ComponentPropsBase } from '@system/types'

/**
 * @file Component Props - Link
 * @module lib/atoms/Link/props
 */

export interface LinkProps extends ComponentPropsBase<'a'> {
  /**
   * If true, add the class `active`.
   */
  $active?: boolean

  /**
   * If defined, style as `Button`.
   */
  $btn?: Color

  /**
   * If true, render as `Dropdown` item. If set to `toggle`, render as
   * `Dropdown` toggle link.
   */
  $dropdown?: boolean | 'toggle'

  /**
   * Make the link span the full width of its parent container.
   */
  $fluid?: boolean

  /**
   * If true, render as `Menu` link.
   */
  $menu?: boolean

  /**
   * Indicates that the user cannot interact with the link.
   */
  disabled?: boolean

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
   * The name of the link.
   */
  name?: ButtonProps['name']

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
}
