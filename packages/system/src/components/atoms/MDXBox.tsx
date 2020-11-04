import { useMutatedProps } from '@system/hooks'
import { MDXProps } from '@system/types'
import MDX from 'mdx-scoped-runtime'
import React, { FC } from 'react'
import { Box, BoxProps, Button } from '../atoms'
import { Column } from './Column'
import { Container } from './Container'
import { Divider } from './Divider'
import { FlexBox } from './FlexBox'
import { Heading } from './Heading'
import { Icon } from './Icon'
import { Image } from './Image'
import { Item } from './Item'
import { Link } from './Link'
import { List, ListProps } from './List'
import { Main } from './Main'
import { Paragraph } from './Paragraph'
import { Row } from './Row'
import { Section } from './Section'
import { Span } from './Span'

/**
 * @file Display MDX content
 * @module components/atoms/MDXBox
 */

export type MDXBoxProps = Omit<BoxProps, 'children'> & MDXProps

/**
 * Displays MDX content.
 *
 * Renders a `Box` component with the class `mdx-box`.
 *
 * - https://mdxjs.com/
 * - https://www.npmjs.com/package/mdx-scoped-runtime
 */
export const MDXBox: FC<MDXBoxProps> & {
  components: MDXBoxProps['components']
  scope: MDXBoxProps['scope']
} = (props: MDXBoxProps) => {
  const { children, components = {}, scope = {}, ...rest } = props
  const mutated = useMutatedProps(rest, 'mdx-box')

  return (
    <Box {...mutated}>
      <MDX
        components={{ ...MDXBox.components, ...components }}
        scope={{ ...MDXBox.scope, ...scope }}
      >
        {children}
      </MDX>
    </Box>
  )
}

MDXBox.scope = {
  Button,
  Column,
  Container,
  Divider,
  FlexBox,
  Heading,
  Icon,
  Image,
  Item,
  Link,
  List,
  Main,
  Paragraph,
  Row,
  Section,
  Span
}

MDXBox.components = {
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

MDXBox.displayName = 'MDXBox'

MDXBox.defaultProps = {}
