import { ANYTHING } from '@flex-development/kustomtypez'
import { useMutatedProps } from '@system/hooks'
import {
  ButtonVariant,
  HTMLInputChangeEvent,
  MutatedFormControlProps
} from '@system/types'
import classnames from 'classnames'
import { isEmpty, isString } from 'lodash'
import React, { FC } from 'react'
import { Box, BoxProps, IconProps, Input, Label } from '../atoms'

/**
 * @file Labeled checkbox/radio element
 * @module lib/molecules/FormCheck
 */

export interface FormCheckProps extends BoxProps {
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
   * `onChange` handler. Fires when the `<input>` element is clicked.
   */
  onChange?(event: HTMLInputChangeEvent): ANYTHING

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
 * Displays a labeled `checkbox` or `radio` `<input>` element.
 *
 * **TODO**:
 *
 * - Handle `htmlFor` attribute on `Label` component
 */
export const FormCheck: FC<FormCheckProps> = (props: FormCheckProps) => {
  const {
    btn,
    checked,
    defaultChecked,
    defaultValue,
    disabled,
    form,
    icon,
    inline,
    label,
    name,
    onChange,
    switch: form_switch,
    type,
    value,
    ...rest
  } = props

  const as_btn = !isEmpty(btn)
  const no_label_text = isEmpty(label)

  const mutated = useMutatedProps<typeof rest>(rest, {
    'form-check': no_label_text && as_btn,
    'form-check-inline': no_label_text && inline,
    'form-switch': form_switch
  })

  mutated['data-disabled'] = disabled
  mutated['data-type'] = type

  return (
    <Box {...mutated}>
      <Input
        checked={checked}
        className={classnames({ 'btn-check': !isEmpty(btn) })}
        defaultChecked={defaultChecked}
        defaultValue={defaultValue}
        disabled={disabled}
        form={form}
        name={name}
        onChange={onChange}
        type={type}
        value={value}
      />

      <Label
        className={classnames({ btn: as_btn, [`btn-${btn}`]: isString(btn) })}
        icon={icon}
      >
        {label}
      </Label>
    </Box>
  )
}

FormCheck.defaultProps = {
  type: 'radio'
}
