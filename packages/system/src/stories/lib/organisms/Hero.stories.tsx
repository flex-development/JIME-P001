import { Hero, HeroProps } from '@system/lib'
import { StoryFN } from '@system/types'
import React from 'react'

/**
 * @file Stories - Hero
 * @module stories/lib/organisms/Hero
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