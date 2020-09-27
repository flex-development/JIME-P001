/**
 * @file Type declarations related to UI theme
 * @see {@link https://v5.getbootstrap.com/}
 */

/**
 * Background size options.
 */
export type BackgroundSize = 'auto' | 'contain' | 'cover'

/**
 * Responsive breakpoints.
 */
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

/**
 * {@link Button} component variants.
 */
export type ButtonVariant = ThemeColor | ThemeOutline | 'link'

/**
 * Font weights.
 */
export type FontWeight =
  | 'hairline'
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black'

/**
 * Possible {@link Button} component sizes.
 */
export type FormControlSize = Pick<Size, 'sm' | 'lg'>

/**
 * Text sizes.
 */
export type Size = 'xs' | 'sm' | 'lg' | 'xl'

/**
 * Keys of `scss` `$spacers` map.
 */
export type SpacerKey =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 8
  | 9
  | 10
  | 12
  | 14
  | 16
  | 18
  | 20
  | 24
  | 48
  | 56
  | 64

/**
 * Theme colors.
 */
export type ThemeColor =
  | 'dark'
  | 'darker'
  | 'ghost'
  | 'light'
  | 'primary'
  | 'secondary'

/**
 * Theme outline classes.
 */
export type ThemeOutline =
  | 'outline-dark'
  | 'outline-darker'
  | 'outline-ghost'
  | 'outline-light'
  | 'outline-primary'
  | 'outline-secondary'

/**
 * Properties to help generate Bootstrap text utility classes.
 *
 * @todo Update in tandum with the Sass utilities config
 *
 * @see {@link https://v5.getbootstrap.com/docs/5.0/utilities/text/}
 */
export type TextUtilitiesConfig = {
  // Text alignment
  center?: boolean | typeof Breakpoint
  left?: boolean | typeof Breakpoint
  right?: boolean | typeof Breakpoint

  // Text wrapping and overflow
  nowrap?: boolean
  wrap?: boolean

  // Word break
  break?: boolean

  // Text transform
  capitalize?: boolean
  lowercase?: boolean
  uppercase?: boolean

  // Monospace (font families)
  monospace?: boolean
  sans?: boolean

  // Font weight and italics
  black?: boolean
  bold?: boolean
  extrabold?: boolean
  hairline?: boolean
  light?: boolean
  medium?: boolean
  normal?: boolean
  semibold?: boolean
  thin?: boolean

  // Line height
  'lh-1'?: boolean
  'lh-base'?: boolean
  'lh-lg'?: boolean
  'lh-sm'?: boolean

  // Reset color
  reset?: boolean

  // Text decoration
  'decoration-line-through'?: boolean
  'decoration-none'?: boolean
  'decoration-underline'?: boolean
}
