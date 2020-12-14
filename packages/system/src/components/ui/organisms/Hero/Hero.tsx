import { Heading, Paragraph, Section } from '@system/components/ui/atoms'
import { useSanitizedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import { FC } from 'react'

/**
 * @file Jumbotron-style component
 * @module components/ui/organisms/Hero/impl
 */

export interface HeroProps extends MutatedProps {
  /**
   * Hero subtitle.
   */
  subtitle: string

  /**
   * Hero title.
   */
  title: string
}

/**
 * Full width jumbotron-style component for calling attention to featured
 * content or information. Renders a `Section` component with the class `hero`.
 */
export const Hero: FC<HeroProps> = (props: HeroProps) => {
  const { subtitle, title, ...rest } = props

  const sanitized = useSanitizedProps<typeof rest>(rest, 'hero')

  return (
    <Section {...sanitized}>
      <Heading className='hero-title'>{title}</Heading>
      <Paragraph className='hero-subtitle'>{subtitle}</Paragraph>
    </Section>
  )
}

Hero.displayName = 'Hero'

Hero.defaultProps = {}
