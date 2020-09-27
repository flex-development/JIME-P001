import { StoryFN, variant } from '@kustomz-config'
import { Details, DetailsProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Details
 * @module stories/lib/atoms/Details
 */

export default {
  argTypes: { variant },
  component: Details,
  title: 'Library/Atoms/Details'
}

/**
 * Main menu {@link Details} story.
 */
export const Default: StoryFN<DetailsProps> = (args: DetailsProps) => (
  <Details {...args} />
)

Default.args = {
  children: 'Something small enough to escape casual notice.',
  summary: { children: 'Details' }
}
