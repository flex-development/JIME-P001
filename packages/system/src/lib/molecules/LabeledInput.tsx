import { useMutatedProps } from '@kustomz/hooks'
import { FormControlSize } from '@kustomz/types'
import React, { FC } from 'react'
import { Input, InputRefProps, Label, LabelProps, Span } from '../atoms'

/**
 * @file Render a labeled <input> element
 * @module lib/molecules/LabeledInput
 */

/**
 * {@link LabeledInput} component properties.
 */
export interface LabeledInputProps extends LabelProps {
  /**
   * Properties to pass to the inner `Input` component.
   *
   * @default {}
   */
  input?: InputRefProps

  /**
   * Make the control smaller or larger.
   *
   * See: https://v5.getbootstrap.com/docs/5.0/forms/form-control/#sizing
   */
  size?: false | FormControlSize
}

/**
 * Renders a `Label` component with an `Input` component inside.
 */
export const LabeledInput: FC<LabeledInputProps> = (
  props: LabeledInputProps
) => {
  const { children, input = {}, size, ...rest } = props

  const mutatedProps = useMutatedProps<typeof rest, LabelProps>(rest, {
    'form-control': true,
    [`form-control-${size}`]: size,
    'labeled-input': true
  })

  mutatedProps['data-disabled'] = input.disabled
  mutatedProps['data-required'] = input.required
  mutatedProps['data-type'] = input.type

  return (
    <Label {...mutatedProps}>
      {children && <Span>{children}</Span>}
      <Input {...input} />
    </Label>
  )
}

LabeledInput.defaultProps = {
  input: {}
}
