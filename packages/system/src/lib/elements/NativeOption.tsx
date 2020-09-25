import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes,
} from 'react'
import {GlobalProps, PropsForFormElement} from '../declarations'
import {useMutatedProps, useTextContentDictionary} from '../modules/hooks'

/**
 * @module lib/elements/NativeOption
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/option}
 */

/**
 * {@link NativeOption} component properties.
 */
export interface NativeOptionProps extends GlobalProps<HTMLOptionElement> {
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
   * If true, indicates that the option is initially selected.
   */
  selected?: boolean

  /**
   * Value to be submitted with the form, should this option be selected. If
   * this attribute is omitted, the value is taken from the text content of the
   * option element.
   */
  value?: PropsForFormElement['value']
}

/**
 * {@link NativeOption} component properties without the `ref` property.
 */
export type ReflessNativeOptionProps = PropsWithoutRef<NativeOptionProps>

/**
 * Ref attributes for `<option>` elements.
 */
export type NativeOptionRefAttributes = RefAttributes<HTMLOptionElement>

/**
 * {@link NativeOption} component forward ref properties.
 */
export type NativeOptionRefProps = ReflessNativeOptionProps &
  NativeOptionRefAttributes

/**
 * Renders an `<option>` element.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/option**
 */
export const NativeOption: FREC<NativeOptionRefProps> = forwardRef(
  (props, ref) => {
    const {dictionary, sanitized} = useTextContentDictionary<typeof props>(
      props
    )

    const mutatedProps = useMutatedProps<
      typeof sanitized,
      JSX.IntrinsicElements['option']
    >(sanitized, dictionary)

    return <option {...mutatedProps} ref={ref} />
  }
)
