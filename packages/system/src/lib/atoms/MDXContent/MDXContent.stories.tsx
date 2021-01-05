import { MDXContent } from './MDXContent'
import { MDXContentProps } from './MDXContent.props'

/**
 * @file Stories - MDXContent
 * @module lib/atoms/MDXContent/stories
 */

export default {
  component: MDXContent,
  parameters: {
    jest: ['MDXContent']
  },
  title: 'Library/Atoms/MDXContent'
}

export const MarkdownMDX: FCS<MDXContentProps> = args => (
  <MDXContent {...args} />
)

MarkdownMDX.args = {
  children: `**Hello, World**\n<Button>${MDXContent.displayName}</Button>`
}

export const PureMarkdown: FCS<MDXContentProps> = args => (
  <MDXContent {...args} />
)

PureMarkdown.args = {
  children:
    '## Hello, World\nRamps fixie flexitarian locavore man bun shabby chic. Lyft asymmetrical forage mumblecore, kombucha copper mug snackwave selfies offal pork belly activated charcoal tacos. Pop-up wolf 3 wolf moon truffaut umami scenester mlkshk bespoke aesthetic whatever tousled drinking vinegar fanny pack iPhone.'
}

export const PureMDX: FCS<MDXContentProps> = args => <MDXContent {...args} />

PureMDX.args = {
  children: `<Section><Heading size={2}>${MDXContent.displayName}</Heading><Paragraph mb={72}>Ramps fixie flexitarian locavore man bun shabby chic. Lyft asymmetrical forage mumblecore, kombucha copper mug snackwave selfies offal pork belly activated charcoal tacos. Pop-up wolf 3 wolf moon truffaut umami scenester mlkshk bespoke aesthetic whatever tousled drinking vinegar fanny pack iPhone.</Paragraph></Section>`
}
