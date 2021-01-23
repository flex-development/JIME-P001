import kapi from '@app/config/axios-kapi'
import type { GetGlobalMetafieldsResJSON, SEOData } from '@kapi/types'
import debug from 'debug'

/**
 * @file Implementation - globalSEO
 * @module subdomains/app/utils/globalSEO
 */

/**
 * Returns an object with global SEO data.
 *
 * @async
 * @throws {FeathersErrorJSON}
 */
const globalSEO = async (): Promise<SEOData> => {
  let globals = {} as GetGlobalMetafieldsResJSON

  try {
    globals = await kapi<GetGlobalMetafieldsResJSON>({
      url: '/metafields/globals'
    })
  } catch (error) {
    debug('subdomains/app/utils/globalSEO')(error)
    throw error
  }

  const {
    description: { value: description },
    keywords: { value: keywords },
    social_share_image: { value: social_share_image }
  } = globals

  // Parse social share image
  let og_image = `${process.env.API_URL}/assets/images/morena.webp`
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
      'image:height': 1080,
      'image:width': 1080
    },
    twitter: { card: 'summary', image: og_image }
  }
}

export default globalSEO
