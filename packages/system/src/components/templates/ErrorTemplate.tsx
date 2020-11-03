import { useMutatedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import React from 'react'
import { FlexBox, Heading, Main } from '../atoms'

/**
 * @file Error page template
 * @module components/templates/ErrorTemplate
 */

export interface ErrorTemplateProps extends MutatedProps {
  /**
   * Error status code.
   */
  code: number

  /**
   * Error message.
   */
  message?: string
}

/**
 * Display a client-side or server-side error.
 *
 * Renders a `Main` component with the class `template` and attribute
 * `data-template='error'`.
 */
export const ErrorTemplate: TC<ErrorTemplateProps> = (
  props: ErrorTemplateProps
) => {
  const { code, message, ...rest } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'template')

  return (
    <Main {...mutated} data-template={ErrorTemplate.template_id}>
      <FlexBox align='center' justify='center'>
        <Heading className='error-code'>{code}</Heading>
        <Heading className='error-message' size={2}>
          {message}
        </Heading>
      </FlexBox>
    </Main>
  )
}

ErrorTemplate.template_id = 'error'

ErrorTemplate.defaultProps = {}
