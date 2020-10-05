import { useMutatedProps } from '@kustomz/hooks'
import React, { FC } from 'react'
import { Label, LabelProps, Select, SelectRefProps, Span } from '../atoms'

/**
 * @file Render a labeled <select> element
 * @module lib/molecules/LabeledSelect
 */

/**
 * `LabeledSelect` component properties.
 */
export interface LabeledSelectProps extends LabelProps {
  /**
   * Label text.
   */
  children?: string

  /**
   * Properties to pass to the inner `Select` component.
   *
   * @default {}
   */
  select?: SelectRefProps
}

/**
 * Renders a `Label` component with an `Select` component inside.
 */
export const LabeledSelect: FC<LabeledSelectProps> = (
  props: LabeledSelectProps
) => {
  const { children, select = {}, ...rest } = props

  const mutatedProps = useMutatedProps<typeof rest, LabelProps>(rest, {
    'labeled-select': true
  })

  mutatedProps['data-disabled'] = select.disabled

  select['aria-label'] = select['aria-label'] || children

  return (
    <Label {...mutatedProps}>
      {children && <Span>{children}</Span>}
      <Select {...select} data-selected={rest['data-selected']} />
    </Label>
  )
}

LabeledSelect.defaultProps = {
  select: {}
}
