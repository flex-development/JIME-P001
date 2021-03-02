import kapi from '@app/config/axios-kapi'
import type { GetGlobalMetafieldsResJSON, SEOData } from '@kustomzcore/types'

/**
 * @file Implementation - globalSEO
 * @module utils/globalSEO
 */

/**
 * Returns an object with global SEO data.
 *
 * @async
 * @throws {FeathersErrorJSON}
 */
const globalSEO = async (): Promise<SEOData> => {
  const {
    description: { value: description },
    keywords: { value: keywords },
    social_share_image: { value: social_share_image }
  } = await kapi<GetGlobalMetafieldsResJSON>({ url: '/metafields/globals' })

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
