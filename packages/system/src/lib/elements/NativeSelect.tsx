import React, {
  FC,
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  ReactNodeArray,
  RefAttributes
} from 'react'
import {
  GlobalProps,

  ThemeColor, ThemeOutline
} from '../declarations'
import { NativeOption, NativeOptionProps } from '../elements'
import { useMutatedProps } from '../modules/hooks'

/**
 * @module lib/elements/NativeSelect
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/select}
 * @see {@link https://v5.getbootstrap.com/docs/5.0/forms/select/}
 */

/**
 * {@link NativeSelect} component properties.
 */
export interface NativeSelectProps extends GlobalProps<HTMLSelectElement> {
  /**
   * Array of `NativeOption` components to render.
   */
  children?: Array<typeof NativeOption | FC<NativeOptionProps>>

  /**
   * JSON array of options to render.
   *
   * @default []
   */
  options?: NativeOptionProps[]

  /**
   * Background color or outline variant.
   *
   * @default false
   */
  variant?: boolean | ThemeColor | ThemeOutline
}

/**
 * Ref attributes for `<select>` elements.
 */
export type NativeSelectRefAttributes = RefAttributes<HTMLSelectElement>

/**
 * {@link NativeSelect} component forward ref properties.
 */
export type NativeSelectRefProps = ReflessNativeSelectProps &
  NativeSelectRefAttributes

/**
 * {@link NativeSelect} component properties without the `ref` property.
 */
export type ReflessNativeSelectProps = PropsWithoutRef<NativeSelectProps>

/**
 * Renders a `<select>` element with the class `form-control`.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/select**
 * - **https://v5.getbootstrap.com/docs/5.0/forms/select/**
 */
export const NativeSelect: FREC<NativeSelectRefProps> = forwardRef(
  (props, ref) => {
    const { options, ...rest } = props

    const mutatedProps = useMutatedProps<
      typeof rest,
      JSX.IntrinsicElements['select']
    >(rest, 'form-control')

    return (
      <select {...mutatedProps} ref={ref}>
        {((): ReactNodeArray => {
          if (rest.children) return rest.children

          return (options as NativeOptionProps[]).map(
            (props: NativeOptionProps, i: number) => {
              const key = props['data-key'] || props.id || `item-${i}`
              return <NativeOption {...props} key={key} />
            }
          )
        })()}
      </select>
    )
  }
)

NativeSelect.defaultProps = {
  options: []
}
