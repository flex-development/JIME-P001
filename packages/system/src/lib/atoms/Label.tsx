import { useMutatedProps } from '@kustomz/hooks'
import { MutatedProps } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'

/**
 * @file Render a <label> element
 * @module lib/elements/Label
 */

/**
 * {@link Label} component properties.
 */
export interface LabelProps extends MutatedProps<HTMLLabelElement> {
  /**
   * If true, apply the class `col-form-label` instead of `form-label`.
   *
   * - https://v5.getbootstrap.com/docs/5.0/forms/overview/#form-text
   *
   * @default false
   */
  col?: boolean

  /**
   * True if labelling a form control element where `required=true`.
   *
   * @default false
   */
  required?: boolean
}

/**
 * {@link Label} component properties without the `ref` property.
 */
export type ReflessLabelProps = PropsWithoutRef<LabelProps>

/**
 * Ref attributes for `<label>` elements.
 */
export type LabelRefAttributes = RefAttributes<HTMLLabelElement>

/**
 * {@link Label} component forward ref properties.
 */
export type LabelRefProps = ReflessLabelProps & LabelRefAttributes

/**
 * Renders a `<label>` element with the class `form-label` or `col-form-label`.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/label**
 * - **https://v5.getbootstrap.com/docs/5.0/forms/overview/#form-text**
 */
export const Label: FREC<LabelRefProps> = forwardRef((props, ref) => {
  const { col, required, ...rest } = props

  if (required) rest['data-required'] = required

  const mutatedProps = useMutatedProps<
    typeof rest,
    JSX.IntrinsicElements['label']
  >(rest, {
    'col-form-label': col,
    'form-label': !col
  })

  /* eslint-disable jsx-a11y/label-has-associated-control */

  return (
    <label {...mutatedProps} ref={ref}>
      {required && '*'}
      {mutatedProps.children}
    </label>
  )

  /* eslint-enable jsx-a11y/label-has-associated-control */
})

Label.defaultProps = {
  col: false,
  required: false
}
