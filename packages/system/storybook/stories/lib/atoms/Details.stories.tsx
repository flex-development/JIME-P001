import { Details, DetailsProps } from '@kustomz/lib'
import React from 'react'
import { StoryFN } from '../../../config'

/**
 * @file Stories - Details
 * @module stories/lib/atoms/Details
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
