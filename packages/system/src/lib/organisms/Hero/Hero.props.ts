import { SectionProps } from '@system/lib/atoms'

/**
 * @file Component Props - Hero
 * @module lib/organisms/Hero/props
 */

export interface HeroProps extends Omit<SectionProps, '$content'> {
  /**
   * Hero subtitle.
   */
  subtitle: string

  /**
   * Hero title.
   */
  title: string
}
