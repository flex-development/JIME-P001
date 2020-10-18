import { useMutatedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'

/**
 * @file Render a <label> element
 * @module lib/atoms/Label
 */

export interface LabelProps extends MutatedProps<HTMLLabelElement> {
  /**
   * If true, add the class `col-form-label`.
   *
   * - https://v5.getbootstrap.com/docs/5.0/forms/overview/#form-text
   *
   * @default false
   */
  col?: boolean

  /**
   * If true, add the class `form-label`.
   *
   * - https://v5.getbootstrap.com/docs/5.0/forms/overview/#form-text
   *
   * @default false
   */
  form?: boolean

  /**
   * The `id` of a labelable form-related element in the same document as the
   * `<label>` element. If this attribute is missing, the form-related element
   * should be nested within the `Label` instead.
   *
   * Because `for` is a reserved keyword in JavaScript, React uses `htmlFor`
   * instead.
   *
   */
  htmlFor?: string

  /**
   * True if labelling a form control element where `required=true`.
   *
   * @default false
   */
  required?: boolean
}

/**
 * Label component properties without the `ref` property.
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
 * Renders a `<label>` element.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/label**
 * - **https://v5.getbootstrap.com/docs/5.0/forms/overview/#form-text**
 */
export const Label: FREC<LabelRefProps> = forwardRef((props, ref) => {
  const { col, form, htmlFor, required, ...rest } = props

  if (required) rest['data-required'] = required

  const mutated = useMutatedProps<typeof rest, JSX.IntrinsicElements['label']>(
    rest,
    {
      'col-form-label': col,
      'form-label': form
    }
  )

  /* eslint-disable-next-line jsx-a11y/label-has-associated-control */

  return (
    <label {...mutated} htmlFor={htmlFor} ref={ref}>
      {required && '*'}
      {mutated.children}
    </label>
  )

  /* eslint-enable jsx-a11y/label-has-associated-control */
})

Label.displayName = 'Label'

Label.defaultProps = {
  col: false,
  required: false
}
