import { PRODUCTS, REVIEWS } from '@system-mocks/utils'
import { IndexTemplate } from './IndexTemplate'
import type { IndexTemplateProps } from './IndexTemplate.props'

/**
 * @file Stories - IndexTemplate
 * @module lib/templates/IndexTemplate/stories
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

export const Homepage: FCS<IndexTemplateProps> = args => (
  <IndexTemplate {...args} />
)

Homepage.args = {
  ...IndexTemplate.defaultProps,
  about_section_text:
    'Officia celiac qui tilde everyday carry banjo. Aesthetic succulents yr viral woke, consectetur stumptown keytar slow-carb hot chicken eiusmod biodiesel umami. +1 tacos you probably haven’t heard of them four loko selvage celiac, laboris qui brooklyn fixie succulents blog. Subway tile culpa you probably haven’t heard of them, forage consequat woke cornhole wayfarers meh.',
  products: PRODUCTS,
  products_section_text:
    'Cred bicycle rights vinyl echo park prism non ullamco sriracha gentrify cardigan esse minim succulents commodo ea. Lumbersexual butcher chillwave +1 umami pinterest selfies everyday carry deep v venmo chartreuse incididunt asymmetrical pitchfork fam. Cronut humblebrag flannel est.',
  reviews: REVIEWS.slice(0, 5)
}
