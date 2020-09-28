import { Summary, SummaryProps } from '@kustomz/lib'
import React from 'react'
import { StoryFN } from '../../../config'

/**
 * @file Stories - Summary
 * @module stories/lib/atoms/Summary
 */

export default {
  component: Summary,
  parameters: {
    jest: ['Summary']
  },
  title: 'Library/Atoms/Summary'
}

/**
 * Default {@link Summary} story.
 */
export const Default: StoryFN<SummaryProps> = (args: SummaryProps) => (
  <Summary {...args} />
)

Default.args = {
  children: 'Summary text'
}
