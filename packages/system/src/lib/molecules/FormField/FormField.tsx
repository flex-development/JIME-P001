import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Box, BoxProps } from '@system/lib/atoms/Box'
import { Label } from '@system/lib/atoms/Label'
import type { FC, ReactElement } from 'react'
import type { FormFieldProps } from './FormField.props'

/**
 * @file Implementation - FormField
 * @module lib/molecules/FormField/impl
 */

/**
 * Displays a labeled `Form` control component.
 * Renders a `Box` component with the class `form-field`.
 */
export const FormField: FC<FormFieldProps> = props => {
  const { children, label, required, ...rest } = props

  const sanitized = useSanitizedProps<'div', BoxProps>(rest, 'form-field')
  const $required = (children as ReactElement)?.props.required || required

  return (
    <Box {...sanitized}>
      <Label $form className='form-field-label' required={$required}>
        {label}
      </Label>
      <Box className='form-field-control'>{children}</Box>
    </Box>
  )
}

FormField.displayName = 'FormField'

FormField.defaultProps = {}
