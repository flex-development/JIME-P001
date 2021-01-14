import { SectionProps } from '@system/lib/atoms/Section'

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
