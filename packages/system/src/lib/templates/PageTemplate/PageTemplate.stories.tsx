import {
  PureMarkdown,
  PureMDX
} from '../../molecules/MDXContent/MDXContent.stories'
import { PageTemplate } from './PageTemplate'
import type { PageTemplateProps } from './PageTemplate.props'

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
  body: PureMarkdown.args.code
}

export const MDX: FCS<PageTemplateProps> = args => <PageTemplate {...args} />

MDX.args = {
  body: PureMDX.args.code
}
