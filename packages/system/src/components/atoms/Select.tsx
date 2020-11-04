import { useMutatedProps } from '@system/hooks'
import { MutatedFormControlProps } from '@system/types'
import React, {
  FC,
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  ReactNodeArray,
  RefAttributes
} from 'react'
import { Option, OptionProps } from './Option'

/**
 * @file Render a `<select>` element
 * @module components/atoms/Select
 */

export interface SelectProps
  extends MutatedFormControlProps<HTMLSelectElement> {
  /**
   * Array of `Option` components to render.
   */
  children?: Array<typeof Option | FC<OptionProps>>

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
  defaultValue?: SelectProps['value']

  /**
   * JSON array of options to render.
   *
   * @default []
   */
  options?: OptionProps[]

  /**
   * Placeholder text.
   */
  placeholder?: string

  /**
   * Value of currently selected option.
   */
  value?: MutatedFormControlProps['value']
}

/**
 * Ref attributes for `<select>` elements.
 */
export type SelectRefAttributes = RefAttributes<HTMLSelectElement>

/**
 * {@link Select} component forward ref properties.
 */
export type SelectRefProps = ReflessSelectProps & SelectRefAttributes

/**
 * Select component properties without the `ref` property.
 */
export type ReflessSelectProps = PropsWithoutRef<SelectProps>

/**
 * Renders a `<select>` element with the class `form-select`.
 *
 * - https://v5.getbootstrap.com/docs/5.0/forms/select
 * - https://developer.mozilla.org/docs/Web/HTML/Element/select
 * - https://developer.mozilla.org/docs/Web/API/HTMLSelectElement
 */
export const Select: FREC<SelectRefProps> = forwardRef((props, ref) => {
  const { options = [], ...rest } = props

  const mutated = useMutatedProps<typeof rest, JSX.IntrinsicElements['select']>(
    rest,
    'form-select'
  )

  return (
    <select {...mutated} ref={ref}>
      {((): ReactNodeArray => {
        if (rest.children) return rest.children

        return options.map((option: OptionProps, i: number) => {
          const key = option['data-key'] || option.id || `item-${i}`
          return <Option {...option} key={key} />
        })
      })()}
    </select>
  )
})

Select.displayName = 'Select'

Select.defaultProps = {
  options: []
}
