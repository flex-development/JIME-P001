import { useMutatedProps } from '@system/hooks'
import { MutatedProps, TC } from '@system/types'
import MDX from 'mdx-scoped-runtime'
import React from 'react'
import {
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
  ListProps,
  Main,
  Paragraph,
  Row,
  Section,
  Span
} from '../atoms'
import { Menu } from '../molecules'

/**
 * @file Basic page template
 * @module components/templates/PageTemplate
 *
 * @todo Update documentation
 */

export interface PageTemplateProps extends MutatedProps {
  /**
   * Markdown or MDX string containing page content.
   */
  body?: string
}

/**
 * Renders a `Main` component with the class `template` and attribute
 * `data-template='page'`. Page content can be written using Markdown or MDX.
 *
 * - https://mdxjs.com/playground
 *
 * **TODO**:
 *
 * - Update usage instructions
 */
export const PageTemplate: TC<PageTemplateProps> = (
  props: PageTemplateProps
) => {
  const { body, ...rest } = props

  const mutated = useMutatedProps<typeof rest>(rest, 'template')

  const scope = {
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
    Menu,
    Paragraph,
    Row,
    Section,
    Span
  }

  const components = {
    a: scope.Link,
    h1: scope.Heading,
    h2: scope.Heading,
    h3: scope.Heading,
    h4: scope.Heading,
    h5: scope.Heading,
    h6: scope.Heading,
    hr: scope.Divider,
    img: scope.Image,
    li: scope.Item,
    ol: (props: ListProps) => <List {...props} is='ol' />,
    p: scope.Paragraph,
    ul: scope.List
  }

  return (
    <Main {...mutated} data-template={PageTemplate.template_id}>
      <MDX components={components} scope={scope}>
        {body}
      </MDX>
    </Main>
  )
}

PageTemplate.template_id = 'page'

PageTemplate.defaultProps = {
  body: ''
}
