import { color, size, StoryFN } from '@kustomz-config'
import { Summary, SummaryProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Summary
 * @module stories/lib/elements/Summary
 */

export default {
  argTypes: { color, size },
  component: Summary,
  title: 'Elements/Summary'
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
