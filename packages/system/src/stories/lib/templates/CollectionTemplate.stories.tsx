import {
  CollectionTemplate,
  CollectionTemplateDefaultProps,
  CollectionTemplateProps
} from '@system/components'
import { StoryFN } from '@system/types'
import collections from '@system/__mocks__/collections.mock.json'
import React from 'react'

/**
 * @file Stories - CollectionTemplate
 * @module stories/lib/templates/CollectionTemplate
 */

export default {
  args: {
    style: {
      maxWidth: '1410px'
    }
  },
  component: CollectionTemplate,
  parameters: {
    jest: ['CollectionTemplate']
  },
  title: 'Library/Templates/CollectionTemplate'
}

const { description, products, title } = collections[0]

export const Products: StoryFN<CollectionTemplateProps> = (
  args: CollectionTemplateProps
) => <CollectionTemplate {...args} />

Products.args = {
  ...CollectionTemplateDefaultProps,
  description,
  products,
  title
}
