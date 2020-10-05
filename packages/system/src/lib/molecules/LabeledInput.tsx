import { useMutatedProps } from '@kustomz/hooks'
import React, { FC } from 'react'
import { Input, InputRefProps, Label, LabelProps, Span } from '../atoms'

/**
 * @file Render a labeled <input> element
 * @module lib/molecules/LabeledInput
 */

/**
 * `LabeledInput` component properties.
 */
export interface LabeledInputProps extends LabelProps {
  /**
   * Label text.
   */
  children?: string

  /**
   * Properties to pass to the inner `Input` component.
   *
   * @default {}
   */
  input?: InputRefProps
}

/**
 * Renders a `Label` component with an `Input` component inside.
 */
export const LabeledInput: FC<LabeledInputProps> = (
  props: LabeledInputProps
) => {
  const { children, input = {}, ...rest } = props

  const mutatedProps = useMutatedProps<typeof rest, LabelProps>(rest, {
    'labeled-input': true
  })

  mutatedProps['data-disabled'] = input.disabled
  mutatedProps['data-required'] = input.required

  input['aria-label'] = input['aria-label'] || children

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
