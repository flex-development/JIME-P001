import { Link } from '@kustomzdesign/lib/atoms/Link'
import type { ParagraphProps } from '@kustomzdesign/lib/atoms/Paragraph'
import { Paragraph } from '@kustomzdesign/lib/atoms/Paragraph'
import type { FC, ReactElement } from 'react'

/**
 * @file Implementation - ErrorContent
 * @module components/ErrorContent/impl
 */

/**
 * Renders the `NotFound` and `ServerError` page content.
 *
 * @param {ParagraphProps} props - Component properties
 * @return {ReactElement<ParagraphProps>} Error page content
 */
export const ErrorContent: FC<ParagraphProps> = (
  props: ParagraphProps
): ReactElement<ParagraphProps> => (
  <Paragraph {...props}>
    {/* eslint-disable-next-line prettier/prettier */}
    Go <Link href='/'>home</Link> and smoke or something.
  </Paragraph>
)

ErrorContent.displayName = 'ErrorContent'

ErrorContent.defaultProps = {}
