import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Heading } from '@system/lib/atoms/Heading'
import type { MainProps } from '@system/lib/atoms/Main'
import { Main } from '@system/lib/atoms/Main'
import { Section } from '@system/lib/atoms/Section'
import { Span } from '@system/lib/atoms/Span'
import type { TC } from '@system/types'
import type { ErrorTemplateProps } from './ErrorTemplate.props'

/**
 * @file Implementation - ErrorTemplate
 * @module lib/templates/ErrorTemplate/impl
 */

/**
 * Error page template. Displays an error code and message.
 *
 * Renders a `Main` component with the classes `template` and `error-template`,
 * as well as the attribute `data-template='error'`.
 */
export const ErrorTemplate: TC<ErrorTemplateProps> = props => {
  const { children, code, message, ...rest } = props

  const sanitized = useSanitizedProps<'main', MainProps>(rest, 'error-template')

  return (
    <Main {...sanitized} data-template={ErrorTemplate.template_id}>
      <Section id='template-header'>
        <Heading className='template-heading'>
          <Span className='error-template-code'>{code}</Span>
          <Span className='error-template-divider'>/</Span>
          <Span className='error-template-message'>{message}</Span>
        </Heading>
      </Section>

      {children}
    </Main>
  )
}

ErrorTemplate.displayName = 'ErrorTemplate'

ErrorTemplate.defaultProps = {}

ErrorTemplate.template_id = 'error'
