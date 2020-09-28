import { useMutatedProps } from '@kustomz/hooks'
import { MutatedFormControlProps, MutatedProps } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'

/**
 * @file Render a `<option>` element
 * @module lib/elements/Option
 */

/**
 * {@link Option} component properties.
 */
export interface OptionProps extends MutatedProps<HTMLOptionElement> {
  /**
   * If true, make option uncheckable.
   */
  disabled?: boolean

  /**
   * Meaning of the option. If the `label` isn't defined, its value is that of
   * the element text content.
   */
  label?: string

  /**
   * Value to be submitted with the form, should this option be selected. If
   * this attribute is omitted, the value is taken from the text content of the
   * option element.
   */
  value?: MutatedFormControlProps['value']
}

/**
 * {@link Option} component properties without the `ref` property.
 */
export type ReflessOptionProps = PropsWithoutRef<OptionProps>

/**
 * Ref attributes for `<option>` elements.
 */
export type OptionRefAttributes = RefAttributes<HTMLOptionElement>

/**
 * {@link Option} component forward ref properties.
 */
export type OptionRefProps = ReflessOptionProps & OptionRefAttributes

/**
 * Renders an `<option>` element.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/option**
 */
export const Option: FREC<OptionRefProps> = forwardRef((props, ref) => {
  const mutatedProps = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['option']
  >(props)

  return <option {...mutatedProps} ref={ref} />
})
