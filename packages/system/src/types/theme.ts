import type { Primitive } from '@flex-development/json/utils/types'

/**
 * @file Theme Types
 * @module types/theme
 */

/**
 * Keys of background size values.
 */
export type BackgroundSize = 'auto' | 'contain' | 'cover'

/**
 * Keys of border widths used in theme.
 */
export type BorderWidth = 'base' | 'light' | 'none' | 'thin' | 'thick'

/**
 * Keys of colors used in theme.
 */
export type Color =
  | 'black'
  | 'curr'
  | 'danger'
  | 'dark'
  | 'darker'
  | 'ghost'
  | 'gray'
  | 'muted'
  | 'light'
  | 'primary'
  | 'secondary'
  | 'white'

/**
 * Keys of CSS `cursor` values used in theme.
 */
export type Cursor =
  | 'auto'
  | 'default'
  | 'move'
  | 'no'
  | 'pointer'
  | 'text'
  | 'wait'

/**
 * (`margin-`, `padding`, etc) directions.
 */
export type Direction = 'bottom' | 'left' | 'right' | 'top'

/**
 * CSS `display` values used in theme.
 */
export type Display =
  | 'block'
  | 'flex'
  | 'grid'
  | 'inline-block'
  | 'inline-flex'
  | 'inline'
  | 'table-cell'
  | 'table-row'
  | 'table'
  | 'none'

/**
 * Values for the `align-items` property.
 *
 * Defines the default behavior for how flex items are laid out along the cross
 * axis on the current line.
 *
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox
 */
export type FlexAlignItems =
  | 'around'
  | 'between'
  | 'center'
  | 'end'
  | 'evenly'
  | 'start'

/**
 * Values for the `flex-direction` property.
 *
 * Establishes the main-axis of the flexbox.
 *
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox
 */
export type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse'

/**
 * Flexbox values for the `display` property.
 *
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox
 */
export type FlexDisplay = 'flex' | 'inline-flex'

/**
 * Values for the `justify-content` property.
 *
 * Defines the alignment along the main flebox axis.
 *
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox
 */
export type FlexJustifyContent =
  | 'around'
  | 'between'
  | 'center'
  | 'end'
  | 'evenly'
  | 'start'

/**
 * Values for the `flex-wrap` property.
 *
 * By default, flex items will all try to fit onto one line. You can change that
 * and allow the items to wrap as needed with this property.
 *
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox
 */
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

/**
 * Keys of font families used in the theme.
 */
export type FontFamily = 'mono' | 'sans' | 'special'

/**
 * Keys of font sizes used in the theme.
 */
export type FontSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'

/**
 * Font weights used in the theme.
 */
export type FontWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold'

/**
 * `Form` control component sizes.
 */
export type FormControlSize = 'sm' | 'lg'

/**
 * Grid breakpoints.
 */
export enum GridBreakpoints {
  xs = 0,
  sm = 576,
  md = 834,
  lg = 1180,
  xl = 1368,
  xxl = 1440
}

/**
 * Grid breakpoint key.
 */
export type GridBreakpointKey = keyof typeof GridBreakpoints

/**
 * Keys used to control the placement of a grid row.
 *
 * - https://tailwindcss.com/docs/grid-column#class-reference
 */
export type GridColumnPosition = GridRowPosition | 7 | 8 | 9 | 10 | 11 | 12

/**
 * Keys used to control the size of a grid column.
 *
 * - https://tailwindcss.com/docs/grid-column#class-reference
 */
export type GridColumnSpan = GridRowSpan | 7 | 8 | 9 | 10 | 11 | 12

/**
 * Keys used to specify rows in a grid layout.
 *
 * - https://tailwindcss.com/docs/grid-template-columns#class-reference
 */
export type GridColumnsTemplate = GridRowsTemplate | 7 | 8 | 9 | 10 | 11 | 12

/**
 * Keys used to control the placement of a grid row.
 *
 * - https://tailwindcss.com/docs/grid-row#class-reference
 */
export type GridRowPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 'auto'

/**
 * Keys used to control the size of a grid row.
 *
 * - https://tailwindcss.com/docs/grid-row#class-reference
 */
export type GridRowSpan = GridRowPosition | 'full'

/**
 * Keys used to specify rows in a grid layout.
 *
 * - https://tailwindcss.com/docs/grid-template-rows#class-reference
 */
export type GridRowsTemplate = 1 | 2 | 3 | 4 | 5 | 6 | 'none'

/**
 * Keys of opacity values used in theme.
 */
export type Opacity = 0 | 25 | 50 | 75 | 100 | 'disabled'

/**
 * Size keys.
 */
export type Size =
  | Space
  | 25
  | 50
  | 75
  | 100
  | 'available'
  | 'auto'
  | 'fluid'
  | 'maxc'
  | 'minc'

/**
 * Pixel values for spacing used in theme.
 */
export type Space =
  | 0
  | 1
  | 2
  | 4
  | 8
  | 10
  | 12
  | 14
  | 16
  | 18
  | 20
  | 24
  | 32
  | 36
  | 40
  | 48
  | 60
  | 64
  | 72
  | 80
  | 96

/**
 * Spacing utility class prefixes.
 */
export type SpacingPrefix =
  | 'gap'
  | 'gx'
  | 'gy'
  | 'm'
  | 'mb'
  | 'mt'
  | 'ml'
  | 'mr'
  | 'mx'
  | 'my'
  | 'p'
  | 'pb'
  | 'pt'
  | 'pl'
  | 'pr'
  | 'px'
  | 'py'

/**
 * Utility class generator config.
 */
export type UtilityClassConfig<T = Primitive> =
  | T
  | UtilityClassConfigResponsive<T>

/**
 * Responsive utility object where each key is `keyof typeof GridBreakpoints`.
 */
export type UtilityClassConfigResponsive<T = Primitive> = Partial<
  Record<keyof typeof GridBreakpoints, T | undefined>
>

/**
 * Alias for `UtilityClassConfigResponsive`.
 */
export type UCCR<T = Primitive> = UtilityClassConfigResponsive<T>

/**
 * Keys of z-index values used in theme.
 */
export type ZIndex = 0 | 10 | 20 | 30 | 40 | 50 | 'auto'
