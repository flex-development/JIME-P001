import { useMutatedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import { Heading, Main, Section, Span } from '../../atoms'

/**
 * @file Error page template
 * @module components/templates/ErrorTemplate/impl
 */

export interface ErrorTemplateProps extends MutatedProps {
  /**
   * Error status code.
   */
  code: number

  /**
   * Error message.
   */
  message: string
}

/**
 * Displays an error code and message.
 *
 * Renders a `Main` component with the class `template` and attribute
 * `data-template='error'`.
 */
export const ErrorTemplate: TC<ErrorTemplateProps> = (
  props: ErrorTemplateProps
) => {
  const { children, code, message, ...rest } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'template')

  return (
    <Main {...mutated} data-template={ErrorTemplate.template_id}>
      <Section>
        <Heading size={2}>
          <Span className='error-code'>{code}</Span>
          <Span className='error-divider'>/</Span>
          <Span className='error-message'>{message}</Span>
        </Heading>
        {children}
      </Section>
    </Main>
  )
}

ErrorTemplate.displayName = 'ErrorTemplate'

ErrorTemplate.defaultProps = {}

ErrorTemplate.template_id = 'error'
