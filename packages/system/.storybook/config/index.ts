import { Args, Parameters } from '@storybook/api'
import { FC } from 'react'

/**
 * @file Storybook Config
 * @module storybook/config
 */

export const excludePropKeys = []

export type StoryFN<T = Args> = FC<T> & {
  args?: T | Partial<T>
  parameters?: Parameters
  storyName?: string
}

export * from './args'
export * from './colors'
export * from './components'
export * from './typography'
export * from './viewports'

