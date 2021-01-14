import { BoxProps } from '@system/lib/atoms/Box'
import { InputProps } from '@system/lib/atoms/Input'

/**
 * @file Component Props - FormField
 * @module lib/molecules/FormField/props
 */

export interface FormFieldProps extends BoxProps {
  /**
   * HTML tag name of the type of `Form` control being rendered.
   */
  'data-control'?: 'input' | 'select' | 'textarea'

  /**
   * If rendering an `Input` inside the form field, this value should match the
   * element's `type`  property.
   */
  'data-type'?: InputProps['type']

  /**
   * `Label` component text.
   */
  label: string
}
