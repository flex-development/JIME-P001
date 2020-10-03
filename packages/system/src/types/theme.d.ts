/**
 * @file Type declarations related to UI theme
 * @see https://v5.getbootstrap.com/
 */

/**
 * Responsive breakpoints.
 */
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

/**
 * {@link Button} component variants.
 */
export type ButtonVariant = ThemeColor | ThemeOutline | 'link'

/**
 * Possible {@link Button} component sizes.
 */
export type FormControlSize = 'sm' | 'lg'

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
