import { useMutatedProps } from '@kustomz/hooks'
import { FormControlSize, MutatedProps } from '@kustomz/types'
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
 * @module lib/elements/Select
 */

/**
 * {@link Select} component properties.
 */
export interface SelectProps extends MutatedProps<HTMLSelectElement> {
  /**
   * Array of `Option` components to render.
   */
  children?: Array<typeof Option | FC<OptionProps>>

  /**
   * JSON array of options to render.
   *
   * @default []
   */
  options?: OptionProps[]

  /**
   * Make the control smaller or larger.
   *
   * See: https://v5.getbootstrap.com/docs/5.0/forms/form-control/#sizing
   */
  size?: false | FormControlSize
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
 * {@link Select} component properties without the `ref` property.
 */
export type ReflessSelectProps = PropsWithoutRef<SelectProps>

/**
 * Renders a `<select>` element with the class `form-control`.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/select**
 * - **https://v5.getbootstrap.com/docs/5.0/forms/select/**
 */
export const Select: FREC<SelectRefProps> = forwardRef((props, ref) => {
  const { options = [], size, ...rest } = props

  const mutatedProps = useMutatedProps<
    typeof rest,
    JSX.IntrinsicElements['select']
  >(rest, {
    'form-control': true,
    [`form-control-${size}`]: size
  })

  return (
    <select {...mutatedProps} ref={ref}>
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

Select.defaultProps = {
  options: []
}
