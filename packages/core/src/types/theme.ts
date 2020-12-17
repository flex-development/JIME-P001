import { Primitive } from '@flex-development/json'

/**
 * @file Type Declarations - UI Theme
 * @module types/theme
 * @see https://v5.getbootstrap.com
 */

/**
 * Background colors.
 */
export type BackgroundColor =
  | GrayscaleColor
  | SemanticColor
  | ThemeColor
  | 'gradient'
  | 'transparent'

/**
 * {@link Button} component variants.
 */
export type ButtonVariant =
  | GrayscaleColor
  | SemanticColor
  | ThemeColor
  | ThemeOutline
  | 'link'
  | 'outline-black'
  | 'outline-white'

/**
 * Number of columns to span.
 */
export type Columns = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * Values for the `align-items` property.
 *
 * Defines the default behavior for how flex items are laid out along the cross
 * axis on the current line.
 *
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox
 */
export type FlexboxAlignItems =
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
export type FlexboxDirection =
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse'

/**
 * Flexbox values for the `display` property.
 *
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox
 */
export type FlexboxDisplay = 'flex' | 'inline-flex'

/**
 * Values for the `justify-content` property.
 *
 * Defines the alignment along the main flebox axis.
 *
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox
 */
export type FlexboxJustifyContent =
  | 'around'
  | 'between'
  | 'center'
  | 'end'
  | 'evenly'
  | 'start'

/**
 * Configuration object for generating flexbox utility classes.
 *
 * Supports standard and responsive variations for the following flexbox
 * properties:
 *
 * - `align-items`
 * - `display`
 * - `flex-direction`
 * - `flex-wrap`
 * - `justify-content`
 *
 * @see https://v5.getbootstrap.com/docs/5.0/utilities/flex
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox
 */
export type FlexboxUtilitiesConfig = {
  /**
   * Use `align-items` utilities on flexbox containers to change the alignment
   * of flex items on the cross axis (the y-axis to start, x-axis if
   * `flex-direction: column`).
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/flex/#align-items
   */
  align?: FlexboxAlignItems | ResponsiveUtility<FlexboxAlignItems>

  /**
   * Set the direction of flex items in a flex container with direction
   * utilities.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/flex/#direction
   */
  direction?: FlexboxDirection | ResponsiveUtility<FlexboxDirection>

  /**
   * Defines the flex container as `block` or `inline`.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/flex
   */
  display?: FlexboxDisplay | ResponsiveUtility<FlexboxDisplay>

  /**
   * Use `justify-content` utilities on flexbox containers to change the
   * alignment of flex items on the main axis (the x-axis to start, y-axis if
   * `flex-direction: column`).
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/flex/#justify-content
   */
  justify?: FlexboxJustifyContent | ResponsiveUtility<FlexboxJustifyContent>

  /**
   * Change how flex items wrap in a flex container.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/flex/#wrap
   */
  wrap?: boolean | FlexboxWrap | ResponsiveUtility<FlexboxWrap>
}

/**
 * Values for the `flex-wrap` property.
 *
 * By default, flex items will all try to fit onto one line. You can change that
 * and allow the items to wrap as needed with this property.
 *
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox
 */
export type FlexboxWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

/**
 * Possible {@link Button} component sizes.
 */
export type FormControlSize = 'sm' | 'lg'

/**
 * Grayscale base colors.
 */
export type GrayscaleColor = 'black' | 'white'

/**
 * Grayscale colors.
 */
export type GrayscaleColorVariation = 'black-50' | 'muted' | 'white-50'

/**
 * Responsive breakpoint keys.
 */
export type GridBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

/**
 * Responsive utility object where each key is that a `GridBreakpoint`.
 */
export type ResponsiveUtility<T = Primitive> = {
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  xxl?: T
}

/**
 * Number of columns per row.
 *
 * @see https://v5.getbootstrap.com/docs/5.0/layout/grid/#row-columns
 */
export type RowColumns = 'auto' | 1 | 2 | 3 | 4 | 5 | 6

/**
 * Semantic color names.
 */
export type SemanticColor = 'danger' | 'info' | 'success' | 'warning'

/**
 * Keys from `$spacers` map.
 */
export type Spacer =
  | 0
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
  | 36
  | 40
  | 48
  | 60
  | 72
  | 80
  | 96

/**
 * Spacer (`margin-`, `padding`, etc) directions.
 */
export type SpacerDirection = 'bottom' | 'left' | 'right' | 'top'

/**
 * Prefixes for utilities using the `$spacers` map.
 *
 * @see https://v5.getbootstrap.com/docs/5.0/layout/gutters/
 * @see https://v5.getbootstrap.com/docs/5.0/utilities/spacing/
 */
export type SpacerPrefix =
  | 'gx'
  | 'gy'
  | 'mb'
  | 'mt'
  | 'ml'
  | 'mr'
  | 'mx'
  | 'my'
  | 'pb'
  | 'pt'
  | 'pl'
  | 'pr'
  | 'px'
  | 'py'

/**
 * Theme colors.
 */
export type ThemeColor =
  | 'accent'
  | 'dark'
  | 'ghost'
  | 'light'
  | 'primary'
  | 'secondary'

/**
 * Theme outline classes.
 */
export type ThemeOutline =
  | 'outline-accent'
  | 'outline-dark'
  | 'outline-ghost'
  | 'outline-light'
  | 'outline-primary'
  | 'outline-secondary'

/**
 * Text colors.
 */
export type TextColor =
  | GrayscaleColor
  | GrayscaleColorVariation
  | SemanticColor
  | ThemeColor
  | 'body'
