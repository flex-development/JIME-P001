import { Link } from '@components/atoms/Link'
import { Paragraph, ParagraphProps } from '@components/atoms/Paragraph'
import { FC } from 'react'

/**
 * @file Implementation - ErrorContent
 * @module subdomains/app/components/ErrorContent/impl
 */

/**
 * Renders the `NotFound` and `ServerError` page content.
 */
export const ErrorContent: FC<ParagraphProps> = props => (
  <Paragraph {...props} $color='white'>
    {/* eslint-disable-next-line prettier/prettier */}
    Go{' '}
    <Link $color='secondary' href='/'>
      home
    </Link>{' '}
    and smoke or something.
  </Paragraph>
)

ErrorContent.displayName = 'ErrorContent'

ErrorContent.defaultProps = {}
