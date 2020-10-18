import { useMutatedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import React, { FC } from 'react'
import { Heading, Paragraph, Section } from '../atoms'

/**
 * @file Jumbotron-style component
 * @module lib/organisms/Hero
 */

/**
 * `Hero` component properties.
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

  const mutated = useMutatedProps<typeof rest>(rest, 'hero')

  return (
    <Section {...mutated}>
      <Heading className='hero-title'>{title}</Heading>
      <Paragraph className='hero-subtitle'>{subtitle}</Paragraph>
    </Section>
  )
}
