import LAYOUT_DATA from '@system/tests/fixtures/api/layout'
import { Hero } from './Hero'
import type { HeroProps } from './Hero.props'

/**
 * @file Stories - Hero
 * @module lib/organisms/Hero/stories
 */

export default {
  component: Hero,
  parameters: {
    jest: ['Hero']
  },
  title: 'Library/Organisms/Hero'
}

export const Default: FCS<HeroProps> = args => <Hero {...args} />

Default.args = LAYOUT_DATA.hero
