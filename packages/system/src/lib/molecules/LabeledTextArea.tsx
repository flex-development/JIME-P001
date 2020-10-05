import { useMutatedProps } from '@kustomz/hooks'
import React, { FC } from 'react'
import { Label, LabelProps, Span, TextArea, TextAreaRefProps } from '../atoms'

/**
 * @file Render a labeled <textarea> element
 * @module lib/molecules/LabeledTextArea
 */

/**
 * `LabeledTextArea` component properties.
 */
export interface LabeledTextAreaProps extends LabelProps {
  /**
   * Label text.
   */
  children?: string

  /**
   * Properties to pass to the inner `TextArea` component.
   *
   * @default {}
   */
  textarea?: TextAreaRefProps
}

/**
 * Renders a `Label` component with an `TextArea` component inside.
 */
export const LabeledTextArea: FC<LabeledTextAreaProps> = (
  props: LabeledTextAreaProps
) => {
  const { children, textarea = {}, ...rest } = props

  const mutatedProps = useMutatedProps<typeof rest, LabelProps>(rest, {
    'labeled-textarea': true
  })

  textarea['aria-label'] = textarea['aria-label'] || children

  return (
    <Label {...mutatedProps}>
      {children && <Span>{children}</Span>}
      <TextArea {...textarea} />
    </Label>
  )
}

LabeledTextArea.defaultProps = {
  textarea: {}
}
