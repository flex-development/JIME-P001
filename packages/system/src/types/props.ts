import type {
  AnyObject,
  Booleanish,
  NullishString
} from '@flex-development/json/utils/types'
import type { AnimatedProps } from '@react-spring/web'
import type { AriaAttributes, DOMAttributes, RefAttributes } from 'react'
import type {
  Color,
  Cursor,
  Display,
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent,
  FlexWrap,
  FontSize,
  FontWeight,
  GridColumnsTemplate,
  GridRowsTemplate,
  Opacity,
  Space,
  UtilityClassConfig,
  ZIndex
} from './theme'
import type { HTMLElements, Merge as M } from './utils'

/**
 * @file Type Definitions - Props
 * @module types/props
 */

/**
 * Aria attributes and event handlers.
 */
export type Attributes<E = HTMLElement> = AriaAttributes &
  DOMAttributes<E> &
  RefAttributes<E> & { forwardedRef?: RefAttributes<E>['ref'] }

/* eslint-disable prettier/prettier */

/**
 * Base component props.
 */
export type ComponentPropsBase<
  T extends keyof JSX.IntrinsicElements = 'div'
> = {
  style?: AnimatedProps<AnyObject>['style']
} & TransientProps &
  GlobalAttributes<HTMLElements[T]>

/* eslint-enable prettier/prettier */

/**
 * Common `Form` (button, input, select) element props.
 */
export interface FormComponentProps {
  /**
   * Specifies that a form control should have input focus when the page
   * loads.
   *
   * Only one form-associated element in a document can have this attribute
   * specified.
   */
  autoFocus?: boolean

  /**
   * Indicates that the user cannot interact with the control.
   *
   * If this attribute is not specified, the control inherits its setting from
   * the containing element, for example `<fieldset>`; if there is no containing
   * element when the `disabled` attribute is set, the control is enabled.
   */
  disabled?: boolean

  /**
   * The `id` of the `<form>` element that the element is associated with.
   *
   * If this attribute is not specified, the element must be a descendant of a
   * form element.
   *
   * This attribute enables you to place elements anywhere within a document,
   * not just as descendants of form elements.
   */
  form?: string

  /**
   * If `true`, add the class `is-invalid`.
   */
  invalid?: boolean

  /**
   * Indicates that the user must fill in a value before submitting a form.
   */
  required?: boolean

  /**
   * The name of the control.
   */
  name?: string

  /**
   * Current value of the form control.
   *
   * Submitted with the form as part of a name/value pair.
   */
  value?: string | ReadonlyArray<string> | number
}

/**
 * Global properties are attributes common to all HTML elements. Even though
 * they can be used on all elements, they may have no effect.
 *
 * The properties defined are the ones to be used by this application.
 *
 * @see https://developer.mozilla.org/docs/Web/HTML/Global_attributes
 */
export interface GlobalAttributes<E = HTMLElement> extends Attributes<E> {
  /**
   * Content to render inside the component.
   *
   * If defined, `innerHTML` must be omitted.
   */
  children?: DOMAttributes<E>['children']

  /**
   * A space-separated list of the classes of the element.
   *
   * Classes allows CSS and JavaScript to select and access specific elements
   * via the class selectors or functions like the method
   * `Document.getElementsByClassName()`.
   */
  className?: string

  /**
   * An enumerated attribute indicating if the element should be editable by
   * the user. If so, the browser modifies its widget to allow editing.
   */
  contentEditable?: Booleanish | 'inherit'

  /**
   * A Boolean attribute indicates that the element is not yet, or is no longer,
   * relevant.
   *
   * For example, it can be used to hide elements of the page that can't be
   * used until the login process has been completed. The browser won't render
   * such elements.
   *
   * This attribute must not be used to hide content that could legitimately
   * be shown.
   */
  hidden?: Booleanish

  /**
   * Defines a unique identifier (ID) which must be unique in the whole
   * document. Its purpose is to identify the element when linking (using a
   * fragment identifier), scripting, or styling (with CSS).
   */
  id?: string

  /* eslint-disable prettier/prettier */

  /**
   * Provides a hint to browsers as to the type of virtual keyboard
   * configuration to use when editing this element or its contents.
   *
   * Used primarily on `<input>` elements, but is usable on any element while
   * in contenteditable mode.
   */
  inputMode?:
    | 'none'
    | 'text'
    | 'decimal'
    | 'numeric'
    | 'tel'
    | 'search'
    | 'email'
    | 'url'

  /* eslint-enable prettier/prettier */

  /**
   * Specify that a standard HTML element should behave like a defined custom
   * built-in element.
   *
   * - https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
   */
  is?: string

  /**
   * An enumerated attribute defines whether the element may be checked for
   * spelling errors.
   *
   * It may have the following values:
   *
   * - `true`: element should be, if possible, checked for spelling errors
   * - `false`: element should not be checked for spelling errors.
   */
  spellCheck?: Booleanish

  /**
   * WAI-ARIA role.
   */
  role?: string

  /**
   * An integer attribute indicating if the element can take input focus (is
   * focusable), if it should participate to sequential keyboard navigation,
   * and if so, at what position.
   *
   * It can take several values:
   *
   * - a negative value means that the element should be focusable, but should
   *   not be reachable via sequential keyboard navigation;
   * - 0 means that the element should be focusable and reachable via
   *   sequential keyboard navigation, but its relative order is defined by
   *   the platform convention;
   * - a positive value means that the element should be focusable and
   *   reachable  via sequential keyboard navigation; the order in which the
   *   elements are focused is the increasing value of the tabindex. If
   *   several elements share the same tabindex, their relative order follows
   *   their relative positions in the document.
   */
  tabindex?: number

  /**
   * Contains a text representing advisory information related to the element
   * it belongs to. Such information can typically, but not necessarily, be
   * presented to the user as a tooltip.
   */
  title?: string

  /**
   * An enumerated attribute that is used to specify whether an element's
   * attribute values and the values of its Text node children are to be
   * translated when the page is localized, or whether to leave them
   * unchanged.
   *
   * It can have the following values:
   *
   * - empty string and yes, which indicates that the element will be
   *   translated.
   * - no, which indicates that the element will not be translated.
   */
  translate?: 'no' | 'yes'
}

/**
 * Ref attributes for HTML elements.
 */
export type HTMLElementRefAttributes = RefAttributes<HTMLElement>

/**
 * Props used to add additional styles and add additional functionality to
 * React's prop API.
 */
export type TransientProps = TransientUtilityProps & {
  /**
   * String containing HTML markup. This value will be used to set the value of
   * `props.dangerouslySetInnerHTML.__html`.
   *
   * If defined, `children` must be omitted.
   *
   * - https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
   */
  $html?: string

  /**
   * URL of the component background image. If valid, the following CSS will be
   * added: `background-image: url(`${$img}`)`.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/background-image
   */
  $img?: NullishString
}

/**
 * Properties used to configure flexboxes.
 *
 * - https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
export type TransientFlexProps = {
  /**
   * Defines the default behavior for how flex items are laid out along the
   * cross axis on the current line.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/align-items
   */
  $falign?: UtilityClassConfig<FlexAlignItems>

  /**
   * Establishes the main-axis, thus defining the direction flex items are
   * placed in the flex container.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/flex-direction
   */
  $fdirection?: UtilityClassConfig<FlexDirection>

  /**
   * Defines the alignment along the main axis. It helps distribute extra free
   * space leftover when either all the flex items on a line are inflexible, or
   * are flexible but have reached their maximum size.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/justify-content
   */
  $fjustify?: UtilityClassConfig<FlexJustifyContent>

  /**
   * Adjust how flexbox items fit onto a line.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/flex-wrap
   */
  $fwrap?: UtilityClassConfig<FlexWrap>
}

/**
 * Properties used to configure grid layouts.
 *
 * - https://css-tricks.com/snippets/css/complete-guide-grid/
 */
export type TransientGridProps = {
  /**
   * Adjust the maximum number of grid columns.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/grid-template-columns
   */
  $columns?: UtilityClassConfig<GridColumnsTemplate>

  /**
   * Adjust the space between grid items.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/gap
   */
  $gap?: UtilityClassConfig<Space>

  /**
   * Adjust the space between grid columns.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/column-gap
   */
  $gx?: UtilityClassConfig<Space>

  /**
   * Adjust the space between grid rows.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/row-gap
   */
  $gy?: UtilityClassConfig<Space>

  /**
   * Adjust the maximum number of grid rows.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/grid-template-rows
   */
  $rows?: UtilityClassConfig<GridRowsTemplate>
}

/**
 * Props used to generate utility classes.
 */
export type TransientUtilityProps = M<
  TransientFlexProps & TransientGridProps,
  TransientSpaceProps
> & {
  /**
   * Adjust the component background color.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/background-color
   */
  $bg?: Color

  /**
   * Adjust the component text color.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/color
   */
  $color?: Color

  /**
   * Adjust the component cursor.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/cursor
   */
  $cursor?: Cursor

  /**
   * Adjust the `display` settings of the component.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/display
   */
  $display?: UtilityClassConfig<Display>

  /**
   * Adjust the `font-size` of the component.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/font-size
   */
  $fs?: UtilityClassConfig<FontSize>

  /**
   * Adjust component `opacity` level.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/opacity
   */
  $opacity?: UtilityClassConfig<Opacity>

  /**
   * Adjust the `font-weight` of the component.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/font-weight
   */
  $weight?: UtilityClassConfig<FontWeight>

  /**
   * Adjust the `z-index` of the component.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/z-index
   */
  $z?: UtilityClassConfig<ZIndex>
}

/**
 * Properties used to adjust the margin and padding values.
 */
export type TransientSpaceProps = {
  /**
   * Adjust the component's `margin` value.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/margin
   */
  $m?: UtilityClassConfig<Space>

  /**
   * Adjust the component's `margin-bottom` value.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/margin-bottom
   */
  $mb?: UtilityClassConfig<Space>

  /**
   * Adjust the component's `margin-left` value.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/margin-left
   */
  $ml?: UtilityClassConfig<Space>

  /**
   * Adjust the component's `margin-right` value.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/margin-right
   */
  $mr?: UtilityClassConfig<Space>

  /**
   * Adjust the component's `margin-top` value.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/margin-top
   */
  $mt?: UtilityClassConfig<Space>

  /**
   * Adjust the component's `margin-left` and `margin-right` values.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/margin-left
   * - https://developer.mozilla.org/docs/Web/CSS/margin-right
   */
  $mx?: UtilityClassConfig<Space>

  /**
   * Adjust the component's `margin-bottom` and `margin-top` values.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/margin-bottom
   * - https://developer.mozilla.org/docs/Web/CSS/margin-top
   */
  $my?: UtilityClassConfig<Space>

  /**
   * Adjust the component's `padding` value.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/padding
   */
  $p?: UtilityClassConfig<Space>

  /**
   * Adjust the component's `padding-bottom` value.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/padding-bottom
   */
  $pb?: UtilityClassConfig<Space>

  /**
   * Adjust the component's `padding-left` value.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/padding-left
   */
  $pl?: UtilityClassConfig<Space>

  /**
   * Adjust the component's `padding-right` value.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/padding-right
   */
  $pr?: UtilityClassConfig<Space>

  /**
   * Adjust the component's `padding-top` value.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/padding-top
   */
  $pt?: UtilityClassConfig<Space>

  /**
   * Adjust the component's `padding-left` and `padding-right` values.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/padding-left
   * - https://developer.mozilla.org/docs/Web/CSS/padding-right
   */
  $px?: UtilityClassConfig<Space>

  /**
   * Adjust the component's `padding-bottom` and `padding-top` values.
   *
   * - https://developer.mozilla.org/docs/Web/CSS/padding-bottom
   * - https://developer.mozilla.org/docs/Web/CSS/padding-top
   */
  $py?: UtilityClassConfig<Space>
}
