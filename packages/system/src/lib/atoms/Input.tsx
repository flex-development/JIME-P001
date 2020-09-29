import { useMutatedProps } from '@kustomz/hooks'
import { FormControlSize, MutatedFormControlProps } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'

/**
 * @module lib/elements/Input
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/input}
 */

/**
 * Input component properties.
 */
export interface InputProps
  extends Omit<MutatedFormControlProps<HTMLInputElement>, 'children' | 'size'> {
  /**
   * Valid for the `file` input type only, the accept property defines which
   * file types are selectable in a file upload control.
   */
  accept?: string

  /**
   * Valid for the `image` input type only, the `alt` attribute provides
   * alternative text for the image, displaying the value of the attribute if
   * the image `src` is missing or otherwise fails to load.
   */
  alt?: string

  /**
   * Non-standard attribute supported by WebKit on iOS (therefore nearly all
   * browsers running on iOS, including Safari, Firefox, and Chrome), which
   * controls whether and how the text value should be automatically
   * capitalized as it is entered/edited by the user.
   */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'

  /* eslint-disable prettier/prettier */

  /**
   * Specifies what permissions the user agent has to provide automated
   * assistance in filling out form field values, as well as tells the browser
   * what type of information expected in the field.
   */
  autoComplete?:
  | 'off'
  | 'on'
  | 'name'
  | 'honorific-prefix'
  | 'given-name'
  | 'additional-name'
  | 'family-name'
  | 'honorific-suffix'
  | 'nickname'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'one-time-code'
  | 'organization-title'
  | 'organization'
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level4'
  | 'address-level3'
  | 'address-level2'
  | 'address-level1'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-extension'
  | 'impp'
  | 'url'
  | 'photo'

  /* eslint-enable prettier/prettier */

  /**
   * Valid for the file input type only, the capture attribute defines which
   * media—microphone, video, or camera—should be used to capture a new file for
   * upload with file upload control in supporting scenarios.
   */
  capture?: string

  /**
   * Valid for `<input type="checkbox">` and `<input type="radio">` types.
   *
   * If present on a `radio` type, it indicates that that radio button is the
   * currently selected one in the group of same-named radio buttons.
   *
   * If present on a `checkbox` type, it indicates that the checkbox is checked
   * by default (when the page loads). It does not indicate whether this
   * checkbox is currently checked?: if the checkbox’s state is changed, this
   * content attribute does not reflect the change.
   */
  checked?: boolean

  /**
   * See description for `defaultValue`; valid for `<input type="checkbox">` and
   * `<input type="radio">` types.
   */
  defaultChecked?: boolean

  /**
   * In the React rendering lifecycle, the `value` attribute on form elements
   * will override the value in the DOM.
   *
   * With an uncontrolled component, you often want React to specify the initial
   * value, but leave subsequent updates uncontrolled. To handle this case, you
   * can specify a `defaultValue` attribute instead of `value`.
   *
   * See: https://reactjs.org/docs/uncontrolled-components.html#default-values
   */
  defaultValue?: MutatedFormControlProps['value']

  /**
   * The values of the list attribute is the id of a `<datalist>` element
   * located in the same document.
   *
   * The `<datalist>`  provides a list of predefined values to suggest to the
   * user for this input.
   *
   * Any values in the list that are not compatible with the type are not
   * included in the suggested options.
   *
   * The values provided are suggestions, not requirements?: users can select
   * from this predefined list or provide a different value.
   *
   * It is valid on `text`, `search`, `url`, `tel`, `email`, `date`, `month`,
   * `week`, `time`, `datetime-local`, `number`, `range`, and `color`.
   *
   * Per the specifications, the list attribute is not supported by the
   * `hidden`, `password`, `checkbox`, `radio`, `file`, or any of the button
   * types.
   *
   * Depending on the browser, the user may see a custom color palette
   * suggested, tic marks along a range, or even a input that opens like a
   * select but allows for non-listed values.
   */
  list?: string

  /**
   * Valid for `date`, `month`, `week`, `time`, `datetime-local`, `number`, and
   * `range`, it defines the greatest value in the range of permitted values.
   *
   * If the value entered into the element exceeds this, the element fails
   * constraint validation.
   *
   * If the value of the max attribute isn't a number, then the element has no
   * maximum value.
   */
  max?: number

  /**
   * Valid for `text`, `search`, `url`, `tel`, `email`, and `password`, it
   * defines the maximum number of characters (as UTF-16 code units) the user
   * can enter into the field. This must be an integer value 0 or higher.
   *
   * If no maxlength is specified, or an invalid value is specified, the field
   * has no maximum length. This value must also be greater than or equal to the
   * value of minlength.
   *
   * The input will fail constraint validation if the length of the text entered
   * into the field is greater than maxlength UTF-16 code units long. By
   * default, browsers prevent users from entering more characters than allowed
   * by the maxlength attribute.
   */
  maxLength?: number

  /**
   * Valid for `date`, `month`, `week`, `time`, `datetime-local`, `number`, and
   * `range`, it defines the most negative value in the range of permitted
   * values.
   *
   * If the value entered into the element is less than this this, the element
   * fails constraint validation.
   *
   * If the value of the min attribute isn't a number, then the element has no
   * minimum value.
   *
   * This value must be less than or equal to the value of the max attribute. If
   * the min attribute is present by is not specified or is invalid, no min
   * value is applied. If the min attribute is valid and a non-empty value is
   * less than the minimum allowed by the min attribute, constraint validation
   * will prevent form submission.
   */
  min?: number

  /**
   * Valid for `text`, `search`, `url`, `tel`, `email`, and `password`, it
   * defines the minimum number of characters (as UTF-16 code units) the user
   * can enter into the entry field. This must be an non-negative integer value
   * smaller than or equal to the value specified by maxlength.
   *
   * If no minlength is specified, or an invalid value is specified, the input
   * has no minimum length.
   *
   * The input will fail constraint validation if the length of the text entered
   * into the field is fewer than minlength UTF-16 code units long, preventing
   * form submission. See Client-side validation for more information.
   */
  minLength?: number

  /**
   * The `Boolean` multiple attribute, if set, means the user can enter comma
   * separated email addresses in the email widget or can choose more than one
   * file with the file input.
   */
  multiple?: boolean

  /**
   * The placeholder attribute is a string that provides a brief hint to the
   * user as to what kind of information is expected in the field.
   *
   * It should be a word or short phrase that demonstrates the expected type of
   * data, rather than an explanatory message. The text must not include
   * carriage returns or line feeds.
   */
  placeholder?: string

  /**
   * A `Boolean` attribute which, if present, indicates that the user should not
   * be able to edit the value of the input.
   *
   * Supported by `text`, `search`, `url`, `tel`, `email`, `date`, `month`,
   * `week`, `time`, `datetime-local`, `number`, and `password` input types.
   */
  readOnly?: boolean

  /**
   * A `Boolean` attribute which, if present, indicates that the user must
   * specify a value for the input before the owning form can be submitted.
   *
   * Supported by `text`, `search`, `url`, `tel`, `email`, `date`, `month`,
   * `week`, `time`, `datetime-local`, `number`, and `file` input types.
   */
  required?: boolean

  /**
   * Make the control smaller or larger.
   *
   * See: https://v5.getbootstrap.com/docs/5.0/forms/form-control/#sizing
   */
  size?: false | FormControlSize

  /**
   * Valid for the numeric input types, including number, date/time input types,
   * and range, the step attribute is a number that specifies the granularity
   * that the value must adhere to.
   *
   * If not explicitly included, step defaults to 1 for number and range, and 1
   * unit type (second, week, month, day) for the date/time input types. The
   * value can must be a positive number - integer or float -- or the special
   * value any, which means no stepping is implied, and any value is allowed
   * (barring other constraints, such as min and max).
   *
   * If any is not explicity set, valid values for the number, date/time input
   * types, and range input types are equal to the basis for stepping - the min
   * value and increments of the step value, up to the max value, if specified.
   *
   * The default stepping value for number inputs is 1, allowing only integers
   * to be entered, unless the stepping base is not an integer. The default
   * stepping value for time is 1 second, with 900 being equal to 15 minutes.
   */
  step?: number

  /* eslint-disable prettier/prettier */

  /**
   * A string specifying the type of control to render. For example, to create a
   * checkbox, a value of `checkbox` is used.
   *
   * If omitted (or an unknown value is specified), the input type `text` is
   * used, creating a plaintext input field.
   *
   * @default 'text'
   */
  type?:
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

  /* eslint-enable prettier/prettier */
}

/**
 * Current value of the form control.
 *
 * Submitted with the form as part of a name/value pair.
 */
export type InputValue = InputProps['value']

/**
 * Input component properties without the `ref` property.
 */
export type ReflessInputProps = PropsWithoutRef<InputProps>

/**
 * Ref attributes for `<input>` elements.
 */
export type InputRefAttributes = RefAttributes<HTMLInputElement>

/**
 * {@link Input} component forward ref properties.
 */
export type InputRefProps = ReflessInputProps & InputRefAttributes

/**
 * Renders an `<input>` element with the class `form-control`.
 *
 * If `type` is `checkbox` or `radio`, the class `form-check-input` will be
 * assigned instead.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/input**
 * - **https://v5.getbootstrap.com/docs/5.0/forms/checks/**
 * - **https://v5.getbootstrap.com/docs/5.0/forms/form-control/**
 */
export const Input: FREC<InputRefProps> = forwardRef((props, ref) => {
  const checkInputTypes = ['checkbox', 'radio']

  const { size, ...rest } = props

  const checks = checkInputTypes.includes(rest.type as string)
  const file = rest.type === 'file'

  const mutatedProps = useMutatedProps<
    typeof rest,
    JSX.IntrinsicElements['input']
  >(rest, {
    'form-check-input': checks,
    'form-control': !checks && !file,
    [`form-control-${size}`]: !checks && size,
    'form-file-input': file
  })

  return <input {...mutatedProps} ref={ref} />
})

Input.defaultProps = {
  type: 'text'
}
