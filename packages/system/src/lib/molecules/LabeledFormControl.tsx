import { useMutatedProps } from '@system/hooks'
import React, { FC } from 'react'
import {
  Input,
  InputRefProps,
  Label,
  LabelProps,
  Select,
  SelectRefProps,
  Span,
  TextArea,
  TextAreaRefProps
} from '../atoms'

/**
 * @file Render a labeled <input>, <select>, or <textarea> element
 * @module lib/molecules/LabeledFormControl
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
  control: InputRefProps | SelectRefProps | TextAreaRefProps

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
      rest['data-type'] = (control as InputRefProps).type
    } else if (name === 'select') {
      control['data-selected'] = rest['data-selected']
    }
  }

  if (!control['aria-label']) control['aria-label'] = children

  rest['data-required'] = control.required

  const mutated = useMutatedProps<typeof rest, LabelProps>(rest, {
    'labeled-form-control': true
  })

  return (
    <Label {...mutated} data-control={name}>
      {children && <Span>{children}</Span>}
      {((): LabelProps['children'] => {
        let component = <Input {...(control as InputRefProps)} />

        if (name === 'select') {
          component = <Select {...(control as SelectRefProps)} />
        } else if (name === 'textarea') {
          component = <TextArea {...(control as TextAreaRefProps)} />
        }

        return component
      })()}
    </Label>
  )
}

LabeledFormControl.defaultProps = {
  control: {},
  name: 'input'
}
