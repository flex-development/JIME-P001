import type { SEOData } from '@flex-development/kustomzcore'
import join from 'lodash/join'
import uniq from 'lodash/uniq'
import { DEFAULT_SEO_IMAGE_DATA } from '../config/constants'
import metafieldsGlobal from './metafieldsGlobal'

/**
 * @file Implementation - globalSEO
 * @module lib/utils/globalSEO
 */

/**
 * Returns an object with global SEO data.
 *
 * @async
 */
const globalSEO = async (): Promise<SEOData> => {
  // Get global SEO data
  const {
    description: { value: description = '' },
    keywords: { value: keywords = '' },
    social_share_image: { value: social_share_image = '' }
  } = await metafieldsGlobal()

  // Parse social share image
  let og_image = DEFAULT_SEO_IMAGE_DATA.src
  if ((social_share_image as string).length) {
    const social_image = JSON.parse(social_share_image as string)
    og_image = social_image[0].cloudinary_src
  }

  return {
    description: description as string,
    keywords: join(uniq((keywords as string).trim().split(',')), ','),
    og: {
      image: og_image,
      'image:alt': "Morena's profile picture",
      'image:height': DEFAULT_SEO_IMAGE_DATA.height,
      'image:width': DEFAULT_SEO_IMAGE_DATA.width
    },
    twitter: { card: 'summary', image: og_image }
  }
}

export default globalSEO
