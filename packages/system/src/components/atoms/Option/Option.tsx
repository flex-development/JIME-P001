import { useMutatedProps } from '@system/hooks'
import { MutatedFormControlProps, MutatedProps } from '@system/types'
import {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'

/**
 * @file Render a `<option>` element
 * @module components/atoms/Option/impl
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
 * Option component properties without the `ref` property.
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
 * - https://developer.mozilla.org/docs/Web/HTML/Element/option
 * - https://developer.mozilla.org/docs/Web/API/HTMLOptionElement
 */
export const Option: FREC<OptionRefProps> = forwardRef((props, ref) => {
  const mutated = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['option']
  >(props)

  mutated['aria-label'] = props.label

  return <option {...mutated} ref={ref} />
})

Option.displayName = 'Option'

Option.defaultProps = {}
