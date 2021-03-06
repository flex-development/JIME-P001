import type { ComponentPropsBase } from '@system/types'

/**
 * @file Component Props - Form
 * @module lib/atoms/Form/props
 */

export interface FormProps extends ComponentPropsBase<'form'> {
  /**
   * Space-separated character encodings the server accepts. The browser uses
   * them in the order in which they are listed. The default value means the
   * same encoding as the page.
   */
  acceptCharset?: string

  /**
   * The URL that processes the form submission.
   *
   * This value can be overridden by a `formAction` attribute on a `<button>`,
   * `<input type="submit">`, or `<input type="image">` element.
   */
  action?: string

  /**
   * Indicates whether input elements can by default have their values
   * automatically completed by the browser.
   *
   * This value can be overridden by a `autoComplete` attribute on form element.
   */
  autoComplete?: 'off' | 'on'

  /**
   * If the value of the method attribute is `post`, `encType` is the MIME type
   * of the form submission. Possible values:
   *
   * - `application/x-www-form-urlencoded`: The default value
   * - `multipart/form-data`: Use if the form contains `<input>` elements with
   *   `type=file`
   * - `text/plain`: Use for debugging purpses
   *
   * This value can be overridden by a `formEncType` attribute on a `<button>`,
   * `<input type="submit">`, or `<input type="image">` element.
   *
   * @default 'application/x-www-form-urlencoded'
   */
  encType?: string

  /**
   * The HTTP method to submit the form with. Possible (case insensitive)
   * values:
   *
   * - `post`: The POST method; form data sent as the request body
   * - `get`: The GET method; form data appended to the action URL with a ?
   *   separator. Use this method when the form has no side-effects
   * - `dialog`: When the form is inside a `<dialog>`, closes the dialog on
   *   submission
   */
  method?: string

  /**
   * The name of the form.
   */
  name?: string

  /**
   * Indicates that the form shouldn't be validated when submitted.
   *
   * If this attribute is not set, this value can be overridden by a
   * `formEncType` attribute on a `<button>`, `<input type="submit">`, or
   * `<input type="image">` element.
   */
  noValidate?: boolean

  /**
   * Indicates where to display the response after submitting the form. The
   * value should be name/keyword for a browsing context (for example, `tab`,
   * `window`, or `iframe`). The following keywords have special meanings:
   *
   * - `_self`: Load into the same browsing context as the current one
   * - `_blank`: Load into a new unnamed browsing context
   * - `_parent`: Load into the parent browsing context of the current one. If
   *   no parent, behaves the same as `_self`
   * - `_top`: Load into the top-level browsing context (i.e., the browsing
   *   context that is an ancestor of the current one and has no parent). If no
   *   parent, behaves the same as `_self`
   *
   * This value can be overridden by a `formTarget` attribute on a `<button>`,
   * `<input type="submit">`, or `<input type="image">` element.
   *
   * @default '_self'
   */
  target?: string
}
