import { Hero } from './Hero'
import { HeroProps } from './Hero.props'

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

Default.args = {
  subtitle: 'Kustom made pot head necessities.',
  title: 'Morenas Kustomz'
}
