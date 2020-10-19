/**
 * @file Type declarations related to UI theme
 * @module types/theme
 * @see https://v5.getbootstrap.com/
 */

/**
 * {@link Button} component variants.
 */
export type ButtonVariant =
  ThemeColor
  | ThemeOutline
  | 'black'
  | 'link'
  | 'outline-black'
  | 'outline-white'
  | 'white'

/**
 * Values for the `align-items` property.
 * 
 * Defines the default behavior for how flex items are laid out along the cross
 * axis on the current line.
 *
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
export type FlexboxAlignItems =
  'around'
  | 'between'
  | 'center'
  | 'end'
  | 'evenly'
  | 'start'

/**
 * Flexbox values for the `display` property.
 * 
 * Flexbox definitions.
 *
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
export type FlexboxDisplay = 'flex' | 'inline-flex'


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
 * @see https://v5.getbootstrap.com/docs/5.0/utilities/flex/
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox/
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
  direction?: FlexDirection | ResponsiveUtility<FlexDirection>

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
 * Values for the `flex-direction` property.
 * 
 * Establishes the main-axis of the flexbox.
 * 
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
export type FlexboxDirection =
  'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse'

/**
 * Values for the `justify-content` property.
 * 
 * Defines the alignment along the main flebox axis.
 * 
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
export type FlexboxJustifyContent =
  'around'
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
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
export type FlexboxWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

/**
 * Possible {@link Button} component sizes.
 */
export type FormControlSize = 'sm' | 'lg'

/**
 * Responsive breakpoints.
 */
export type GridBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

/**
 * Number of columns or rows to span.
 */
export type GridSpan =
  'auto'
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12

/** @todo Update documentation */
export type GridSpanConfig = ResponsiveUtility<boolean | GridSpan>

/** @todo Update documentation */
export type ResponsiveUtility<T = AnyObject> = {
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  xxl?: T
}

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
