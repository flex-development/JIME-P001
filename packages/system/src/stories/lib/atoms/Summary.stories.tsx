import { Summary, SummaryProps } from '@kustomz/lib'
import React from 'react'
import { color, size, StoryFN } from '../../../../.storybook/config'

/**
 * @file Stories - Summary
 * @module stories/lib/atoms/Summary
 */

export default {
  argTypes: { color, size },
  component: Summary,
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
