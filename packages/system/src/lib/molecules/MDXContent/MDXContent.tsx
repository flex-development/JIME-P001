import type { AnyObject } from '@flex-development/json'
import { mdx as createMDXElement, MDXProvider } from '@mdx-js/react'
import { DEFAULT_MDX_CODE } from '@system/config'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { BoxProps } from '@system/lib/atoms/Box'
import { Box } from '@system/lib/atoms/Box'
import type { HeadingProps } from '@system/lib/atoms/Heading'
import type { ImageProps } from '@system/lib/atoms/Image'
import type { ListProps } from '@system/lib/atoms/List'
import type { SectionProps } from '@system/lib/atoms/Section'
import type { FC } from 'react'
import React, { useEffect } from 'react'
import { useSetState } from 'react-hanger/array/useSetState'
import type { MDXContentProps } from './MDXContent.props'

/**
 * @file Implementation - MDXContent
 * @module lib/molecules/MDXContent/impl
 */

/**
 * Displays MDX content.
 * Renders a `Box` component with the class `mdx-content`.
 *
 * - https://mdxjs.com/
 * - https://developer.mozilla.org/docs/Web/HTML/Element/div
 * - https://developer.mozilla.org/docs/Web/API/HTMLDivElement
 */
export const MDXContent: FC<MDXContentProps> = (props: MDXContentProps) => {
  const { code, components = {}, scope, ...rest } = props

  const sanitized = useSanitizedProps<'div', BoxProps>(rest, 'mdx-content')
  const [baseComponents, setBaseComponents] = useSetState<AnyObject>({})

  useEffect(() => {
    async function loadComponents() {
      const atoms = await import('@system/lib/atoms')

      const components: AnyObject = {
        ...atoms,
        Section: (props: SectionProps) => <atoms.Section {...props} $content />,
        a: atoms.Link,
        button: atoms.Button,
        div: (props: BoxProps & { $gridcol?: boolean; $gridrow?: boolean }) => {
          const { $gridcol, $gridrow, ...rest } = props

          if ($gridcol) return <atoms.GridColumn {...rest} />
          if ($gridrow) return <atoms.GridRow {...rest} />

          return <atoms.Box {...rest} />
        },
        h1: atoms.Heading,
        h2: (props: HeadingProps) => <atoms.Heading {...props} $size={2} />,
        h3: (props: HeadingProps) => <atoms.Heading {...props} $size={3} />,
        h4: (props: HeadingProps) => <atoms.Heading {...props} $size={4} />,
        h5: (props: HeadingProps) => <atoms.Heading {...props} $size={5} />,
        h6: (props: HeadingProps) => <atoms.Heading {...props} $size={6} />,
        hr: atoms.Divider,
        img: (props: ImageProps) => <atoms.Image {...props} $fluid />,
        li: atoms.Item,
        main: atoms.Main,
        ol: (props: ListProps) => <atoms.List {...props} is='ol' />,
        p: atoms.Paragraph,
        section: (props: SectionProps) => <atoms.Section {...props} $content />,
        span: atoms.Span,
        ul: atoms.List
      }

      return components
    }

    Promise.resolve(loadComponents().then(setBaseComponents))
  }, [setBaseComponents])

  const fullScope = {
    MDXProvider,
    components: { ...baseComponents, ...components },
    mdx: createMDXElement,
    props: rest,
    ...scope
  }

  return (
    <Box {...sanitized}>
      {(() => {
        if (!Object.keys(fullScope.components).length) return null

        return new Function(
          '_fn',
          'React',
          ...Object.keys(fullScope),
          `${(code?.length && code) || DEFAULT_MDX_CODE}
          return React.createElement(
            MDXProvider,
            { components },
            React.createElement(MDXContent, props)
          )`
        )({}, React, ...Object.values(fullScope))
      })()}
    </Box>
  )
}

MDXContent.displayName = 'MDXContent'

MDXContent.defaultProps = {
  code: DEFAULT_MDX_CODE
}
