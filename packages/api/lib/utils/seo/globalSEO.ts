import { DEFAULT_SEO_IMAGE } from '../../config/constants'
import type { SEOData } from '../../types'
import { globalMetafields } from '../metafields'

/**
 * @file Implementation - globalSEO
 * @module utils/seo/globalSEO
 */

/**
 * Returns an object with global SEO data.
 *
 * @async
 */
const globalSEO = async (): Promise<SEOData> => {
  // Get global SEO data
  const {
    description: { value: description },
    keywords: { value: keywords },
    social_share_image: { value: social_share_image }
  } = await globalMetafields()

  // Parse social share image
  let og_image = DEFAULT_SEO_IMAGE
  if ((social_share_image as string).length) {
    const social_image = JSON.parse(social_share_image as string)
    og_image = social_image[0].cloudinary_src
  }

  return {
    description: description as string,
    keywords: keywords as string,
    og: {
      image: og_image,
      'image:alt': "Morena's profile picture",
      'image:height': 1920,
      'image:width': 1920
    },
    twitter: { card: 'summary', image: og_image }
  }
}

export default globalSEO
