import { ButtonVariant, GridBreakpoint, ThemeColor } from '../types'

/**
 * @file Design System Constants
 * @module constants
 */

export const BUTTON_VARIANTS: ButtonVariant[] = [
  'accent',
  'black',
  'dark',
  'ghost',
  'outline-accent',
  'outline-black',
  'outline-dark',
  'outline-ghost',
  'outline-primary',
  'outline-secondary',
  'outline-white',
  'link',
  'primary',
  'secondary',
  'white'
]

export const FLEXBOX_CONFIG_KEYS = [
  'align',
  'direction',
  'display',
  'justify',
  'wrap'
]

export const FLEXBOX_PROPERTY_MAP = {
  align: 'align-items',
  direction: 'flex-direction',
  display: 'display',
  justify: 'justify-content',
  wrap: 'flex-wrap'
}

// ! Keep in sync with Sass theme settings
export const GRID_BREAKPOINTS: GridBreakpoint[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl'
]

export const THEME_COLORS: ThemeColor[] = [
  'accent',
  'dark',
  'ghost',
  'primary',
  'secondary'
]