import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { OptionProps } from '@system/lib/atoms/Option'
import { Option } from '@system/lib/atoms/Option'
import type { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import type { SelectProps } from './Select.props'

/**
 * @file Implementation - Select
 * @module lib/atoms/Select/impl
 */

/**
 * Renders a `<select>` element with the class `form-select`.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/select
 * - https://developer.mozilla.org/docs/Web/API/HTMLSelectElement
 */
export const Select: FREC<SelectProps> = forwardRef((props, ref) => {
  const { $options = [], ...rest } = props

  const sanitized = useSanitizedProps<'select'>(rest, 'form-select')

  return (
    <select {...sanitized} ref={ref}>
      {(() => {
        if (rest.children) return rest.children

        return $options.map((option: OptionProps, i: number) => (
          <Option
            {...option}
            key={option['data-key'] || option.id || `item-${i}`}
          >
            {option.label || option.children}
          </Option>
        ))
      })()}
    </select>
  )
})

Select.displayName = 'Select'

Select.defaultProps = {
  $options: []
}

export const SelectAnimated: AnimatedFREC<SelectProps> = a(Select)

SelectAnimated.displayName = 'SelectAnimated'

SelectAnimated.defaultProps = Select.defaultProps
