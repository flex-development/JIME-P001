import { Summary } from '@system/components'
import { MutatedProps, StoryFN } from '@system/types'
import React from 'react'

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
export const Default: StoryFN<MutatedProps> = (args: MutatedProps) => (
  <Summary {...args} />
)

Default.args = {
  children: 'Summary text'
}
