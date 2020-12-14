import { StoryFN } from '@system/types/storybook'
import { PureMarkdown, PureMDX } from '../../atoms/MDXBox/MDXBox.stories'
import { PageTemplate, PageTemplateProps } from './PageTemplate'

/**
 * @file Stories - PageTemplate
 * @module components/ui/templates/PageTemplate/stories
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

export const Markdown: StoryFN<PageTemplateProps> = (
  args: PageTemplateProps
) => <PageTemplate {...args} />

Markdown.args = {
  body: PureMarkdown.args.children
}

export const MDX: StoryFN<PageTemplateProps> = (args: PageTemplateProps) => (
  <PageTemplate {...args} />
)

MDX.args = {
  body: PureMDX.args.children
}
