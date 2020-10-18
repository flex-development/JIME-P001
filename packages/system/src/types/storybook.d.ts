import { Args, Parameters } from '@storybook/api'

/**
 * @file Storybook Type Definitions
 * @module types/storybook
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
