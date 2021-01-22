import { Link } from '@components/atoms/Link'
import type { ParagraphProps } from '@components/atoms/Paragraph'
import { Paragraph } from '@components/atoms/Paragraph'
import { EMPTY_SPACE } from '@flex-development/kustomzcore/constants'
import type { FC } from 'react'

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
    Go{EMPTY_SPACE}
    <Link $color='secondary' href='/'>
      home
    </Link>
    {EMPTY_SPACE}
    and smoke or something.
  </Paragraph>
)

ErrorContent.displayName = 'ErrorContent'

ErrorContent.defaultProps = {}
