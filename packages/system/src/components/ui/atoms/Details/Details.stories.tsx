import { StoryFN } from '@system/types/storybook'
import { Details, DetailsProps } from './Details'

/**
 * @file Stories - Details
 * @module components/ui/atoms/Details/stories
 */

export default {
  component: Details,
  parameters: {
    jest: ['Details']
  },
  title: 'Library/Atoms/Details'
}

export const WithSummary: StoryFN<DetailsProps> = (args: DetailsProps) => (
  <Details {...args} />
)

WithSummary.args = {
  children: 'Something small enough to escape casual notice.',
  summary: { children: 'Details' }
}
