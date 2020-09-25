import {Details, DetailsProps} from '@kustomz'
import {box_variant as variant, color, size, StoryFN} from '@kustomz-config'
import React from 'react'

/**
 * @file Stories - Details
 * @module stories/lib/elements/Details
 */

export default {
  argTypes: {color, size, variant},
  component: Details,
  title: 'Elements/Details',
}

/**
 * Main menu {@link Details} story.
 */
export const Default: StoryFN<DetailsProps> = (args: DetailsProps) => (
  <Details {...args} />
)

Default.args = {
  children: 'Something small enough to escape casual notice.',
  summary: {children: 'Details'},
}
