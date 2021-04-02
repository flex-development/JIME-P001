import type { SEOData } from '@flex-development/kustomzcore/types'
import Subject from '../../'
import M from '../../../ShopifyAPI/__tests__/__fixtures__/metafield-globals-obj'

/**
 * @file Test Fixture - Global SEO
 * @module lib/mixins/SEO/tests/fixtures/global-seo
 */

const og_image =
  'https://images.accentuate.io/?image=https%3A%2F%2Fcdn.accentuate.io%2F47047901339%2F1609980100869%2Fmorena.webp%3Fv%3D1611432845736&c_options='

export default {
  description: M.description.value as string,
  keywords: 'marijuana,grinders,ash trays,rolling trays,cannabis,weed',
  og: {
    image: og_image,
    'image:alt': `Morena's profile picture`,
    'image:height': Subject.DEFAULT_IMAGE_PROPS.height,
    'image:width': Subject.DEFAULT_IMAGE_PROPS.width
  },
  twitter: { card: 'summary', image: og_image }
} as SEOData
