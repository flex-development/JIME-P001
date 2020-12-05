import { ANYTHING } from '@flex-development/json'
import { ButtonVariant, FormControlSize } from '@flex-development/kustomzcore'
import { useSanitizedProps } from '@system/hooks'
import { EventHandlers, MutatedFormControlProps } from '@system/types'
import classnames from 'classnames'
import { isEmpty } from 'lodash'
import { FC } from 'react'
import { Box, BoxProps, IconProps, Input, Label } from '../../atoms'

/**
 * @file Checks and radios component
 * @module components/molecules/FormCheck/impl
 */

export interface FormCheckProps extends BoxProps {
  /**
   * Accessible name for assistive technologies.
   */
  'aria-label'?: string

  /**
   * Create button-like checkboxes and radio buttons by using `.btn` styles
   * rather than `.form-check-label` on the `<label>` elements.
   *
   * - https://v5.getbootstrap.com/docs/5.0/forms/checks-radios/#toggle-buttons
   */
  btn?: false | ButtonVariant

  /**
   * If present on a `radio` type, it indicates that that radio button is the
   * currently selected one in the group of same-named radio buttons.
   *
   * If present on a `checkbox` type, it indicates that the checkbox is checked
   * by default (when the page loads). It does not indicate whether this
   * checkbox is currently checked. If the checkbox’s state is changed, this
   * content attribute does not reflect the change.
   */
  checked?: boolean

  /**
   * See description for `defaultValue`.
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
   * Indicates that the user cannot interact with the control.
   */
  disabled?: boolean

  /**
   * The `id` of the `<form>` element that the `<input>` element is associated
   * with.
   *
   * If this attribute is not specified, the element must be a descendant of a
   * form element.
   *
   * This attribute enables you to place elements anywhere within a document,
   * not just as descendants of form elements.
   */
  form?: string

  /**
   * `<label>` elements require the use of a `for` property to link the element
   * to a labelable form-related element in the same document.
   *
   * Because `for` is a reserved keyword in JavaScript, React uses `htmlFor`
   * instead.
   *
   * This value will be passed to inner `Label` component as `htmlFor` and the
   * `Input` component as `id`.
   */
  htmlFor: string

  /**
   * `Icon` properties to pass to the `Label` component.
   */
  icon?: IconProps

  /**
   * If true, add the class `form-check-inline`.
   *
   * - https://v5.getbootstrap.com/docs/5.0/forms/checks-radios/#inline
   */
  inline?: boolean

  /**
   * Label text to render beside the `<input>` element. If omitted, remember
   * to provide an accessible name via the `aria-label` attribute.
   */
  label?: string

  /**
   * The name of the form control.
   */
  name?: string

  /**
   * `onChange` handler. Fires when the `<input>` element value changes.
   */
  onChange?(event: EventHandlers.Change.Input): ANYTHING

  /**
   * Make button-like checkboxes and radio buttons smaller or larger.
   *
   * See: https://v5.getbootstrap.com/docs/5.0/components/buttons/#sizes
   */
  size?: false | FormControlSize

  /**
   * If true, add the class `form-switch`.
   *
   * - https://v5.getbootstrap.com/docs/5.0/forms/checks-radios/#switches
   */
  switch?: boolean

  /**
   * Type of `<input>` element to render.
   *
   * @default 'checkbox'
   */
  type?: 'checkbox' | 'radio'

  /**
   * Current value of the form control.
   *
   * Submitted with the form as part of a name/value pair.
   */
  value?: MutatedFormControlProps['value']
}

/**
 * Custom checkbox / radio `<input>` component.
 *
 * - https://v5.getbootstrap.com/docs/5.0/forms/checks-radios
 */
export const FormCheck: FC<FormCheckProps> = (props: FormCheckProps) => {
  const {
    'aria-label': aria_label,
    btn,
    checked,
    defaultChecked,
    defaultValue,
    disabled,
    form,
    htmlFor,
    icon,
    inline,
    label,
    name,
    onChange,
    size,
    switch: form_switch,
    type,
    value,
    ...rest
  } = props

  const as_btn = !isEmpty(btn) || size
  const no_label_text = isEmpty(label)

  const sanitized = useSanitizedProps<typeof rest, typeof Box>(rest, {
    'form-check': !no_label_text || as_btn,
    'form-check-inline': no_label_text && inline,
    'form-switch': form_switch
  })

  sanitized['data-disabled'] = disabled
  sanitized['data-type'] = form_switch ? 'checkbox' : type

  if (as_btn) sanitized['data-btn'] = true

  return (
    <Box {...sanitized}>
      <Input
        aria-label={aria_label}
        checked={checked}
        className={classnames({ 'btn-check': as_btn })}
        defaultChecked={defaultChecked}
        defaultValue={defaultValue}
        disabled={disabled}
        id={htmlFor}
        form={form}
        name={name}
        onChange={onChange}
        type={sanitized['data-type']}
        value={value}
      />

      <Label
        className={classnames({
          btn: as_btn,
          [`btn-${btn}`]: as_btn,
          [`btn-${size}`]: size,
          'form-check-label': !as_btn
        })}
        icon={icon}
        htmlFor={htmlFor}
      >
        {label}
      </Label>
    </Box>
  )
}

FormCheck.displayName = 'FormCheck'

FormCheck.defaultProps = {
  type: 'checkbox'
}
