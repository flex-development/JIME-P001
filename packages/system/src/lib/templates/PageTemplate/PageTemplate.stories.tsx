import {
  PureMarkdown,
  PureMDX
} from '../../atoms/MDXContent/MDXContent.stories'
import { PageTemplate } from './PageTemplate'
import { PageTemplateProps } from './PageTemplate.props'

/**
 * @file Stories - PageTemplate
 * @module lib/templates/PageTemplate/stories
 */

export default {
  args: {
    style: {
      maxWidth: '1410px'
    }
  },
  component: PageTemplate,
  parameters: {
    jest: ['PageTemplate']
  },
  title: 'Library/Templates/PageTemplate'
}

export const Markdown: FCS<PageTemplateProps> = args => (
  <PageTemplate {...args} />
)

Markdown.args = {
  body: PureMarkdown.args.children
}

export const MDX: FCS<PageTemplateProps> = args => <PageTemplate {...args} />

MDX.args = {
  body: PureMDX.args.children
}
