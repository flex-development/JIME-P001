import { useSanitizedProps } from '@system/hooks'
import MDX from 'mdx-scoped-runtime'
import { FC } from 'react'
import { Box, BoxProps } from '../Box'
import { Button } from '../Button'
import { Divider } from '../Divider'
import { GridColumn } from '../GridColumn'
import { GridRow } from '../GridRow'
import { Heading } from '../Heading'
import { Icon } from '../Icon'
import { Image } from '../Image'
import { Item } from '../Item'
import { Link } from '../Link'
import { List, ListProps } from '../List'
import { Main } from '../Main'
import { Paragraph } from '../Paragraph'
import { Section, SectionProps } from '../Section'
import { Span } from '../Span'
import { MDXContentProps } from './MDXContent.props'

/**
 * @file Implementation - MDXContent
 * @module lib/atoms/MDXContent/impl
 */

/**
 * Displays MDX content.
 * Renders a `Box` component with the class `mdx-content`.
 *
 * - https://mdxjs.com/
 * - https://www.npmjs.com/package/mdx-scoped-runtime
 * - https://developer.mozilla.org/docs/Web/HTML/Element/div
 * - https://developer.mozilla.org/docs/Web/API/HTMLDivElement
 */
export const MDXContent: FC<MDXContentProps> & {
  components: MDXContentProps['components']
  scope: MDXContentProps['scope']
} = (props: MDXContentProps) => {
  const { children, components = {}, scope = {}, ...rest } = props
  const sanitized = useSanitizedProps<'div', BoxProps>(rest, 'mdx-content')

  return (
    <Box {...sanitized}>
      <MDX
        components={{ ...MDXContent.components, ...components }}
        scope={{ ...MDXContent.scope, ...scope }}
      >
        {children}
      </MDX>
    </Box>
  )
}

MDXContent.scope = {
  Button,
  Divider,
  GridColumn,
  GridRow,
  Heading,
  Icon,
  Image,
  Item,
  Link,
  List,
  Main,
  Paragraph,
  Section: (props: SectionProps) => <Section {...props} $content />,
  Span
}

MDXContent.components = {
  a: Link,
  h1: Heading,
  h2: Heading,
  h3: Heading,
  h4: Heading,
  h5: Heading,
  h6: Heading,
  hr: Divider,
  img: Image,
  li: Item,
  ol: (props: ListProps) => <List {...props} is='ol' />,
  p: Paragraph,
  ul: List
}

MDXContent.displayName = 'MDXContent'

MDXContent.defaultProps = {}
