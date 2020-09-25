/**
 * @file Type declarations related to UI theme
 * @see {@link https://v5.getbootstrap.com/}
 */

/**
 * Background size options.
 */
export type BackgroundSize = 'auto' | 'contain' | 'cover'

/**
 * {@link Button} component variants.
 */
export type ButtonVariant = ThemeColor | ThemeOutline | 'link'

/**
 * Possible {@link Container} component sizes.
 */
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

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
