import type { OptionProps } from '@system/lib/atoms/Option'
import type {
  ComponentPropsBase as CPB,
  FormComponentProps
} from '@system/types'

/**
 * @file Component Props - Select
 * @module lib/atoms/Select/props
 */

export interface SelectProps extends CPB<'select'>, FormComponentProps {
  /**
   * Array of `Option` component properties.
   *
   * @default []
   */
  $options?: OptionProps[]

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
  defaultValue?: FormComponentProps['value']

  /**
   * Placeholder text.
   */
  placeholder?: string

  /**
   * Value of currently selected option.
   */
  value?: FormComponentProps['value']
}
