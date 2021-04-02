import { MDXContent } from './MDXContent'
import type { MDXContentProps } from './MDXContent.props'
import CODE_MD_MDX from './__tests__/__fixtures__/md-mdx'
import CODE_PURE_MARKDOWN from './__tests__/__fixtures__/pure-markdown'
import CODE_PURE_MDX from './__tests__/__fixtures__/pure-mdx'

/**
 * @file Stories - MDXContent
 * @module lib/molecules/MDXContent/stories
 */

export default {
  component: MDXContent,
  parameters: {
    jest: ['MDXContent']
  },
  title: 'Library/Molecules/MDXContent'
}

export const MarkdownMDX: FCS<MDXContentProps> = args => (
  <MDXContent {...args} />
)

MarkdownMDX.args = {
  code: CODE_MD_MDX
}

export const PureMarkdown: FCS<MDXContentProps> = args => (
  <MDXContent {...args} />
)

PureMarkdown.args = {
  code: CODE_PURE_MARKDOWN
}

export const PureMDX: FCS<MDXContentProps> = args => <MDXContent {...args} />

PureMDX.args = {
  code: CODE_PURE_MDX
}
