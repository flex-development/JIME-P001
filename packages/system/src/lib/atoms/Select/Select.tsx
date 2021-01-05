import { useSanitizedProps } from '@system/hooks'
import { FREC } from '@system/types'
import { forwardRef } from 'react'
import { a } from 'react-spring'
import { Option, OptionProps } from '../Option'
import { SelectProps } from './Select.props'

/**
 * @file Implementation - Select
 * @module lib/atoms/Select/impl
 */

/**
 * Renders a `<select>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/select
 * - https://developer.mozilla.org/docs/Web/API/HTMLSelectElement
 */
export const Select: FREC<SelectProps> = forwardRef((props, ref) => {
  const { $form, $options = [], ...rest } = props

  const sanitized = useSanitizedProps<'select'>(rest, { 'form-select': $form })

  return (
    <a.select {...sanitized} ref={ref}>
      {(() => {
        if (rest.children) return rest.children

        return $options.map((option: OptionProps, i: number) => {
          const key = option['data-key'] || option.id || `item-${i}`
          return <Option {...option} key={key} />
        })
      })()}
    </a.select>
  )
})

Select.displayName = 'Select'

Select.defaultProps = {
  $options: []
}
