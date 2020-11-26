import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { Hero, HeroProps } from './Hero'

/**
 * @file Stories - Hero
 * @module components/organisms/Hero/stories
 */

export default {
  component: Hero,
  parameters: {
    jest: ['Hero']
  },
  title: 'Library/Organisms/Hero'
}

export const Default: StoryFN<HeroProps> = (args: HeroProps) => (
  <Hero {...args} />
)

Default.args = {
  subtitle: 'Kustom made pot head necessities.',
  title: 'Morenas Kustomz'
}
