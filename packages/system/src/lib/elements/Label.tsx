import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import { TextContentProps } from '../declarations'
import { useMutatedProps, useTextContentDictionary } from '../modules/hooks'

/**
 * @module lib/elements/Label
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/label}
 */

/**
 * {@link Label} component properties.
 */
export interface LabelProps extends TextContentProps<HTMLLabelElement> {
  /**
   * If true, apply the class `col-form-label` instead of `form-label`.
   *
   * - https://v5.getbootstrap.com/docs/5.0/forms/overview/#form-text
   *
   * @default false
   */
  col?: boolean

  /**
   * True if labelling a form element where `required=true`.
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

  const { dictionary, sanitized } = useTextContentDictionary<typeof rest>(rest)

  if (required) sanitized['data-required'] = required

  const mutatedProps = useMutatedProps<
    typeof sanitized,
    JSX.IntrinsicElements['label']
  >(sanitized, {
    ...dictionary,
    'col-form-label': col,
    'form-label': !col
  })

  /* eslint-disable jsx-a11y/label-has-associated-control */

  return <label {...mutatedProps} ref={ref} />

  /* eslint-enable jsx-a11y/label-has-associated-control */
})

Label.defaultProps = {
  col: false,
  required: false
}
