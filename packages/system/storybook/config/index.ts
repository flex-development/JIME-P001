import { Args, Parameters } from '@storybook/api'
import { FC } from 'react'

/**
 * @file Storybook Config
 * @module storybook/config
 */

export const excludePropKeys = [
  '__docgenInfo',
  'about',
  'contextMenu',
  'datatype',
  'dir',
  'displayName',
  'draggable',
  'inlist',
  'itemID',
  'itemProp',
  'itemRef',
  'itemScope',
  'itemType',
  'prefix',
  'property',
  'radioGroup',
  'resource',
  'results',
  'security',
  'slot',
  'suppressContentEditableWarning',
  'suppressHydrationWarning',
  'typeof',
  'vocab'
]

export type StoryFN<T = Args, P = Parameters> = FC<T> & {
  args: T
  parameters?: P
  storyName?: string
}

export * from './components'
export * from './utils'
