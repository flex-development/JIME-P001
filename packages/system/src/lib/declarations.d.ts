import {Booleanish} from '@flex-development/kustomtypez'
import {
  AriaAttributes,
  CSSProperties,
  DOMAttributes,
  RefAttributes,
} from 'react'
import {ContainerProps, IconProps} from './elements'

/**
 * @file Global Component Library Declarations
 * @module lib/declarations
 */

/**
 * Aria attributes and event handlers.
 */
export declare type Attributes<E = HTMLElement> = AriaAttributes &
  DOMAttributes<E> &
  RefAttributes<E> & {forwardedRef?: RefAttributes<E>['ref']}

/**
 * Background size options.
 */
export declare type BackgroundSize = 'auto' | 'contain' | 'cover'

/**
 * {@link Button} component variants.
 */
export declare type ButtonVariant = ThemeColor | ThemeOutline | 'link'

/**
 * Possible {@link Container} component sizes.
 */
export declare type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

/**
 * Common content-sectioning component properties.
 *
 * @see {@link https://websitesetup.org/html5-periodical-table/}
 */
export declare interface ContentSectionProps<E = HTMLElement>
  extends TextContentProps<E> {
  /**
   * Background color or outline variant.
   *
   * @default false
   */
  variant?: boolean | ThemeColor | ThemeOutline
}

/* eslint-disable */

/**
 * Font weights.
 */
export declare type FontWeight =
  | 'hairline'
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black'

/* eslint-enable */

/**
 * Possible {@link Button} component sizes.
 */
export declare type FormControlSize = Pick<Size, 'sm' | 'lg'>

/**
 * Properties common to all components.
 */
export declare interface GlobalProps<E = HTMLElement> extends Attributes<E> {
  /**
   * Content to render inside the component.
   *
   * If defined, `innerHTML` must be omitted.
   */
  children?: DOMAttributes<E>['children']

  /**
   * If defined, wrap inner content in a `Container` component.
   */
  container?: true | ContainerProps<E>

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
   * Add the class "d-flex" or "d-inline-flex".
   *
   * @default false
   */
  flex?: boolean | 'inline'

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
  hidden?: boolean

  /**
   * Icon to render beside the element text.
   */
  icon?: IconProps

  /**
   * Defines a unique identifier (ID) which must be unique in the whole
   * document. Its purpose is to identify the element when linking (using a
   * fragment identifier), scripting, or styling (with CSS).
   */
  id?: string

  /**
   * HTML string to render inside the component.
   *
   * If defined, `children` must be omitted.
   */
  innerHTML?: string

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
   * Helps define the language of an element?: the language that non-editable
   * elements are in, or the language that editable elements should be written
   * in by the user.
   *
   * The attribute contains one “language tag” (made of hyphen-separated
   * “language subtags”) in the format defined in Tags for Identifying
   * Languages (BCP47). xml:lang has priority over it.
   */
  lang?: string

  /**
   * An enumerated attribute defines whether the element may be checked for
   * spelling errors.
   *
   * It may have the following values:
   *
   * - true, which indicates that the element should be, if possible, checked
   *   for spelling errors;
   * - false, which indicates that the element should not be checked for
   *   spelling errors.
   */
  spellCheck?: Booleanish

  /**
   * WAI-ARIA role.
   */
  role?: string

  /**
   * If true, skip the logic in the `useIcon` hook.
   */
  skipUseIcon?: boolean

  /**
   * Contains CSS styling declarations to be applied to the element. Note that
   * it is recommended for styles to be defined in a separate file or files.
   *
   * This attribute and the <style> element have mainly the purpose of
   * allowing for quick styling, for example for testing purposes.
   */
  style?: CSSProperties

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

/* eslint-disable */

/**
 * {@link GridBox} component order options.
 *
 * @see {@link https://react-bootstrap-v5.netlify.app/layout/grid/}
 */
export declare type GridBoxOrder =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'

/**
 * {@link GridBox} component span options.
 *
 * @see {@link https://react-bootstrap-v5.netlify.app/layout/grid/}
 */
export declare type GridBoxSpan = GridBoxOrder

/**
 * Ref attributes for HTML elements.
 */
export declare type HTMLElementRefAttributes = RefAttributes<HTMLElement>

/**
 * Global properties are attributes common to all HTML elements; they can be
 * used on all elements, though they may have no effect on some elements.
 *
 * The properties defined are the ones to be used by this application.
 *
 * **https://developer.mozilla.org/docs/Web/HTML/Global_attributes**
 */
export declare type HTMLGlobalProps = Omit<
  GlobalProps,
  'flex' | 'icon' | 'variant'
>

/**
 * Pulls the common properties from both types, but only maps the values from
 * the first argument.
 *
 * @example NativeProps<JSX.IntrinsicElements['button'], ButtonProps>
 *
 * @see
 * {@link https://stackoverflow.com/questions/47375916/typescript-how-to-create-type-with-common-properties-of-two-types}
 */
export declare type NativeProps<HTMLElementProps, Props> = {
  [HTMLProp in keyof HTMLElementProps & keyof Props]: typeof A[HTMLProp]
}

/**
 * Common `Form` (button, input, select) element props.
 */
export declare interface PropsForFormElement<E = HTMLElement>
  extends GlobalProps<E> {
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
 * Component properties for HTML elements that do not accept inner content.
 */
export declare type PropsForVoidElementTag<E = HTMLElement> = Omit<
  GlobalProps<E>,
  'children' | 'dangerouslySetInnerHTML'
>

/**
 * Text sizes.
 */
export declare type Size = 'xs' | 'sm' | 'lg' | 'xl'

/**
 * Keys of `scss` `$spacers` map.
 */
export declare type SpacerKey =
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
 * Common text content component properties.
 *
 * @see {@link https://websitesetup.org/html5-periodical-table/}
 */
export declare interface TextContentProps<E = HTMLElement>
  extends GlobalProps<E> {
  /**
   * Text content color.
   *
   * @default false
   */
  color?: ThemeColor | boolean

  /**
   * Text content size.
   *
   * @default false
   */
  size?: Size | boolean
}

/**
 * Theme colors.
 */
export declare type ThemeColor =
  | 'dark'
  | 'darker'
  | 'ghost'
  | 'light'
  | 'primary'
  | 'secondary'

/**
 * Theme outline classes.
 */
export declare type ThemeOutline =
  | 'outline-dark'
  | 'outline-darker'
  | 'outline-ghost'
  | 'outline-light'
  | 'outline-primary'
  | 'outline-secondary'
