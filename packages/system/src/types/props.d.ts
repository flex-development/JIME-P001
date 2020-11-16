import {
  BackgroundColor,
  ResponsiveUtility,
  Spacer,
  TextColor
} from '@flex-development/types/theme'
import {
  AnyObject,
  Booleanish,
  NullishString
} from '@flex-development/types/utils'
import {
  MDXProviderComponents as MDXComponents,
  MDXProviderProps
} from '@mdx-js/react'
import {
  AriaAttributes,
  ChangeEvent,
  CSSProperties,
  DOMAttributes,
  FC,
  FocusEvent,
  MouseEvent,
  PropsWithoutRef,
  RefAttributes,
  UIEvent
} from 'react'

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

/**
 * Event handler types.
 */
export namespace EventHandlers {
  export type ClickEvent<E = HTMLElement> = MouseEvent<E> & { target: E }

  export namespace Change {
    export type Input = ChangeEvent<HTMLInputElement>
    export type Select = ChangeEvent<HTMLSelectElement>
    export type TextArea = ChangeEvent<HTMLTextAreaElement>
  }

  export namespace Click {
    export type Anchor = ClickEvent<HTMLAnchorElement>
    export type Button = ClickEvent<HTMLButtonElement>
    export type Input = ClickEvent<HTMLInputElement>
  }

  export namespace Focus {
    export type Anchor = FocusEvent<HTMLAnchorElement>
    export type Button = FocusEvent<HTMLButtonElement>
    export type Input = FocusEvent<HTMLInputElement>
    export type Select = FocusEvent<HTMLSelectElement>
    export type TextArea = FocusEvent<HTMLTextAreaElement>
  }

  export namespace UI {
    export type Anchor = UIEvent<HTMLAnchorElement>
    export type Div = UIEvent<HTMLDivElement>
    export type Button = UIEvent<HTMLButtonElement>
    export type Input = UIEvent<HTMLInputElement>
    export type Select = UIEvent<HTMLSelectElement>
    export type TextArea = UIEvent<HTMLTextAreaElement>
  }
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

/**
 * Ref attributes for HTML elements.
 */
export type HTMLElementRefAttributes = RefAttributes<HTMLElement>

/**
 * MDX component props.
 */
export type MDXProps = Omit<MDXProviderProps, 'children' | 'components'> & {
  children?: string
  components?: MDXComponents
  scope?: Record<string, FC<AnyObject>> | AnyObject
}

/**
 * Properties used to add additional functionality to React's prop handling API.
 *
 * @see https://v5.getbootstrap.com/docs/5.0/utilities
 */
export interface MutatedProps<E = HTMLElement> extends GlobalAttributes<E> {
  /**
   * Background color utility class.
   * 
   * Refer to "Design Tokens" for additional background color options.
   * 
   * - https://v5.getbootstrap.com/docs/5.0/utilities/colors/#background-color
   */
  bg?: BackgroundColor | false

  /**
   * Text color utility class.
   * 
   * Refer to "Design Tokens" for additional text color options.
   * 
   * - https://v5.getbootstrap.com/docs/5.0/utilities/colors/#color
   */
  c?: TextColor | false

  /**
   * Used to work with flexbox utility classes.
   *
   * Possible values:
   *
   * - `false`: Remove flexbox classes
   * - `true`: Apply the class `d-flex`
   * - `inline`: Apply the class `d-inline-flex`
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/flex/
   *
   * @default false
   */
  flex?: Booleanish | 'inline'

  /**
   * If true, add the class `bg-gradient`.
   * 
   * - https://v5.getbootstrap.com/docs/5.0/utilities/colors/#background-gradient
   */
  gradient?: boolean

  /**
   * URL of background image.
   */
  img?: NullishString

  /**
   * String containing HTML markup. This value will be used to set the value of
   * `props.dangerouslySetInnerHTML.__html`.
   *
   * If defined, `children` must be omitted.
   *
   * - https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
   */
  innerHTML?: string

  /**
   * `margin-bottom` value.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/spacing
   */
  mb?: Spacer | ResponsiveUtility<Spacer>

  /**
   * `margin-left` value.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/spacing
   */
  ml?: Spacer | ResponsiveUtility<Spacer>

  /**
   * `margin-right` value.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/spacing
   */
  mr?: Spacer | ResponsiveUtility<Spacer>

  /**
   * `margin-top` value.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/spacing
   */
  mt?: Spacer | ResponsiveUtility<Spacer>

  /**
   * `margin-left` and `margin-right` value.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/spacing
   */
  mx?: Spacer | ResponsiveUtility<Spacer>

  /**
   * `margin-bottom` and `margin-top` value.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/spacing
   */
  my?: Spacer | ResponsiveUtility<Spacer>

  /**
   * `padding-bottom` value.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/spacing
   */
  pb?: Spacer | ResponsiveUtility<Spacer>

  /**
   * `padding-left` value.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/spacing/
   */
  pl?: Spacer | ResponsiveUtility<Spacer>

  /**
   * `padding-right` value.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/spacing
   */
  pr?: Spacer | ResponsiveUtility<Spacer>

  /**
   * `padding-top` value.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/spacing
   */
  pt?: Spacer | ResponsiveUtility<Spacer>

  /**
   * `padding-left` and `padding-right` value.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/spacing
   */
  px?: Spacer | ResponsiveUtility<Spacer>

  /**
   * `padding-bottom` and `padding-top` value.
   *
   * - https://v5.getbootstrap.com/docs/5.0/utilities/spacing
   */
  py?: Spacer | ResponsiveUtility<Spacer>
}

/**
 * Common `Form` (button, input, select) element props.
 */
export interface MutatedFormControlProps<E = HTMLElement>
  extends MutatedProps<E> {
  /**
   * Specifies that a form control should have input focus when the page
   * loads.
   *
   * Only one form-associated element in a document can have this attribute
   * specified.
   */
  autoFocus?: Booleanish

  /**
   * Indicates that the user cannot interact with the control.
   *
   * If this attribute is not specified, the control inherits its setting from
   * the containing element, for example `<fieldset>`; if there is no containing
   * element when the `disabled` attribute is set, the control is enabled.
   */
  disabled?: Booleanish

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
  invalid?: Booleanish

  /**
   * Indicates that the user must fill in a value before submitting a form.
   */
  required?: Booleanish

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
export type MutatedVoidElementProps<E = HTMLElement> = Omit<
  MutatedProps<E>,
  'children' | 'dangerouslySetInnerHTML'
>

/**
 * {@link MutatedProps} type without the `ref` property.
 */
export type ReflessMutatedProps = PropsWithoutRef<MutatedProps>

/**
 * {@link MutatedProps} type forward ref properties.
 */
export type MutatedRefProps = ReflessMutatedProps & HTMLElementRefAttributes

/**
 * Template component properties.
 */
export type TemplateComponent<P = MutatedProps> = FC<P> & {
  template_id: string
}

/**
 * `TemplateComponent` type alias.
 */
export type TC<P = MutatedProps> = TemplateComponent<P>
