import { Args, Parameters } from '@storybook/api'
import { FC } from 'react'

/**
 * @file Storybook Type Definitions
 * @module types/storybook
 * 
 * @todo Update documentation
 */

export type ColorItemProps = {
  title: string
  subtitle: string
  colors:
  | string[]
  | {
    [key: string]: string
  }
}

export type StorybookBackgroundColorConfig = {
  name: string
  value: string
}

export type StoryFN<T = Args, P = Parameters> = FC<T> & {
  args: T
  parameters?: P
  storyName?: string
}
