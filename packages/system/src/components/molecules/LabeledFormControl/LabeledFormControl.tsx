import { useSanitizedProps } from '@system/hooks'
import { FC } from 'react'
import {
  Input,
  InputProps,
  Label,
  LabelProps,
  Select,
  SelectProps,
  Span,
  TextArea,
  TextAreaProps
} from '../../atoms'

/**
 * @file Render a labeled <input>, <select>, or <textarea> element
 * @module components/molecules/LabeledFormControl/impl
 */

/**
 * `LabeledFormControl` component properties.
 */
export interface LabeledFormControlProps extends LabelProps {
  /**
   * Label text.
   */
  children?: string

  /**
   * Properties to pass to the inner `Input` component.
   *
   * @default {}
   */
  control?: InputProps | SelectProps | TextAreaProps

  /**
   * Tag name of the form control to render.
   *
   * @default 'input'
   */
  name?: 'input' | 'select' | 'textarea'
}

/**
 * Renders a `Label` component with an `Input` component inside.
 */
export const LabeledFormControl: FC<LabeledFormControlProps> = (
  props: LabeledFormControlProps
) => {
  const { children, control = {}, name, ...rest } = props

  if (name === 'input' || name === 'select') {
    rest['data-disabled'] = control.disabled

    if (name === 'input') {
      rest['data-type'] = (control as InputProps).type
    } else if (name === 'select') {
      control['data-selected'] = rest['data-selected']
    }
  }

  if (!control['aria-label']) control['aria-label'] = children

  rest['data-required'] = control.required

  const sanitized = useSanitizedProps<typeof rest, LabelProps>(rest, {
    'labeled-form-control': true
  })

  return (
    <Label {...sanitized} data-control={name}>
      {children && <Span>{children}</Span>}
      {((): LabelProps['children'] => {
        let component = <Input {...(control as InputProps)} />

        if (name === 'select') {
          component = <Select {...(control as SelectProps)} />
        } else if (name === 'textarea') {
          component = <TextArea {...(control as TextAreaProps)} />
        }

        return component
      })()}
    </Label>
  )
}

LabeledFormControl.displayName = 'LabeledFormControl'

LabeledFormControl.defaultProps = {
  control: {},
  name: 'input'
}
