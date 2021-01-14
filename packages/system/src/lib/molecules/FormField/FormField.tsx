import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Box, BoxProps } from '@system/lib/atoms/Box'
import { Label } from '@system/lib/atoms/Label'
import { FC } from 'react'
import { FormFieldProps } from './FormField.props'

/**
 * @file Implementation - FormField
 * @module lib/molecules/FormField/impl
 */

/**
 * Displays a labeled `Form` control component.
 * Renders a `Box` component with the class `form-field`.
 */
export const FormField: FC<FormFieldProps> = props => {
  const { children, label, ...rest } = props

  const sanitized = useSanitizedProps<'div', BoxProps>(rest, 'form-field')

  return (
    <Box {...sanitized}>
      <Box className='form-field-control'>{children}</Box>
      <Label $form className='form-field-label'>
        {label}
      </Label>
    </Box>
  )
}

FormField.displayName = 'FormField'

FormField.defaultProps = {}
