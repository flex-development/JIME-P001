import { useSanitizedProps } from '@system/hooks'
import { Heading, Paragraph, Section, SectionProps } from '@system/lib/atoms'
import { FC } from 'react'
import { HeroProps } from './Hero.props'

/**
 * @file Implementation - Hero
 * @module lib/organisms/Hero/impl
 */

/**
 * Full width jumbotron-style component for calling attention to featured
 * content or information.
 * Renders a `Section` component with the class `hero`.
 */
export const Hero: FC<HeroProps> = (props: HeroProps) => {
  const { subtitle, title, ...rest } = props

  const sanitized = useSanitizedProps<'section', SectionProps>(rest, 'hero')

  return (
    <Section {...sanitized}>
      <Heading className='hero-title'>{title}</Heading>
      <Paragraph className='hero-subtitle'>{subtitle}</Paragraph>
    </Section>
  )
}

Hero.displayName = 'Hero'

Hero.defaultProps = {}
