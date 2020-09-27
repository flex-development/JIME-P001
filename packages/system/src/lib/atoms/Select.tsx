import { MutatedProps } from '@kustomz/types'
import React, {
  FC,
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import { useMutatedProps } from '../../hooks'
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
  const mutatedProps = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['select']
  >(props, 'form-control')

  return <select {...mutatedProps} ref={ref} />
})

Select.defaultProps = {}
