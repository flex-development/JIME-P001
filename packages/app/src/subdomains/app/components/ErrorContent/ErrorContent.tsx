import { Link } from '@components/atoms/Link'
import type { ParagraphProps } from '@components/atoms/Paragraph'
import { Paragraph } from '@components/atoms/Paragraph'
import type { FC } from 'react'

/**
 * @file Implementation - ErrorContent
 * @module subdomains/app/components/ErrorContent/impl
 */

/**
 * Renders the `NotFound` and `ServerError` page content.
 */
export const ErrorContent: FC<ParagraphProps> = props => (
  <Paragraph {...props}>
    {/* eslint-disable-next-line prettier/prettier */}
    Go <Link href='/'>home</Link> and smoke or something.
  </Paragraph>
)

ErrorContent.displayName = 'ErrorContent'

ErrorContent.defaultProps = {}
