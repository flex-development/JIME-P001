import products from '@app-tests/__mocks__/data/product-listings.mock.json'
import ReviewsMockRepoRoot from '@app-tests/__mocks__/data/reviews.mock.json'
import { IReview } from '@flex-development/types'
import { IndexTemplate, IndexTemplateProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { IProductListing } from 'shopify-api-node'

/**
 * @file Stories - IndexTemplate
 * @module stories/lib/templates/IndexTemplate
 */

export default {
  args: {
    style: {
      maxWidth: '1410px'
    }
  },
  component: IndexTemplate,
  parameters: {
    jest: ['IndexTemplate']
  },
  title: 'Library/Templates/IndexTemplate'
}

const reviews = Object.values(ReviewsMockRepoRoot) as Array<IReview>

export const Homepage: StoryFN<IndexTemplateProps> = (
  args: IndexTemplateProps
) => <IndexTemplate {...args} />

Homepage.args = {
  ...IndexTemplate.defaultProps,
  about_section_text:
    'Officia celiac qui tilde everyday carry banjo. Aesthetic succulents yr viral woke, consectetur stumptown keytar slow-carb hot chicken eiusmod biodiesel umami. +1 tacos you probably haven’t heard of them four loko selvage celiac, laboris qui brooklyn fixie succulents blog. Subway tile culpa you probably haven’t heard of them, forage consequat woke cornhole wayfarers meh.',
  products: (products as unknown) as Array<IProductListing>,
  products_section_text:
    'Cred bicycle rights vinyl echo park prism non ullamco sriracha gentrify cardigan esse minim succulents commodo ea. Lumbersexual butcher chillwave +1 umami pinterest selfies everyday carry deep v venmo chartreuse incididunt asymmetrical pitchfork fam. Cronut humblebrag flannel est.',
  reviews: reviews.slice(0, 3)
}
