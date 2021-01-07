import { AnyObject, PartialOr } from '@flex-development/json'
import {
  ICollectionListing,
  IMetafield,
  IPage,
  IPolicy,
  IProductListing
} from '@flex-development/kustomzcore'
import { getProductImage } from '@flex-development/kustomzdesign'
import { SEOProps } from '@subdomains/app/components'
import { objectFromArray as ofa } from '@subdomains/app/utils/objectFromArray'
import { join } from 'lodash'
import stripHtml from 'string-strip-html'

/**
 * @file Implementation - getSEOData
 * @module subdomans/utils/getSEOData/impl
 */

/**
 * Returns an object with SEO data.
 *
 * @async
 * @param globals - Shopify `globals` namespace metafields obj
 * @param page - Page to get SEO data from
 * @param type - Type of page data
 */
const getSEOData = async (
  globals: Record<string, PartialOr<IMetafield>>,
  page:
    | (ICollectionListing & { products: IProductListing[] })
    | IPage
    | IPolicy
    | (IProductListing & { variant: number })
    | Record<'seo', Partial<SEOProps>> = { seo: {} },
  type?: 'collection' | 'page' | 'policy' | 'product'
): Promise<SEOProps> => {
  // Get global SEO data from globals metafields object
  const {
    description: { value: description },
    keywords: { value: keywords },
    social_share_image: { value: social_share_image }
  } = globals

  // Parse social share image
  let og_image = `${process.env.SITE_URL}/assets/morena.jpeg`
  if ((social_share_image as string).length) {
    const social_image = JSON.parse(social_share_image as string)
    og_image = social_image[0].cloudinary_src
  }

  // Get base SEO props
  let seo: SEOProps = {
    og: {
      image: og_image,
      'image:alt': "Morena's profile picture",
      'image:height': '1080px',
      'image:width': '1080px'
    },
    twitter: { card: 'summary', image: og_image }
  }

  // Get page SEO
  if (type === 'collection') {
    const data = page as ICollectionListing & { products: IProductListing[] }

    // Get collection image
    const image = data.default_product_image || data.image

    // Build keywords from product tags
    const keywords: string[] = []
    data.products?.forEach(product => keywords.concat(product.tags.split(',')))

    // Update SEO data
    seo = {
      ...seo,
      description: stripHtml(data.body_html).result,
      keywords: join(keywords),
      og: {
        image: image.src || null,
        'image:alt': image.alt || null,
        'image:height': image.height || null,
        'image:secure_url': image.src || null,
        'image:width': image.width || null
      },
      title: `Collections - ${data.title}`,
      twitter: { card: 'summary', image: image.src }
    }
  } else if (type === 'page') {
    const data = page as IPage

    // Get page metafields
    const page_metafields = ofa(data.metafield, 'key')

    // Parse page description
    let p_description = page_metafields.description_tag.value as string
    if (!p_description.length) p_description = description as string

    // Parse page keywords
    let p_keywords = (page_metafields?.keywords?.value as string) ?? ''
    if (!p_keywords.length) p_keywords = keywords as string

    // Add page description, keywords, and title to SEO object
    seo.description = p_description
    seo.title = page_metafields.title_tag.value as string
    seo.keywords = p_keywords
  } else if (type === 'policy') {
    const data = page as IPolicy

    seo.title = data.title
    seo.description = stripHtml(data.body).result
  } else if (type === 'product') {
    const data = page as IProductListing & { variant: number }
    const { available, vendor } = data as AnyObject

    // Update SEO data
    seo = {
      ...seo,
      description: stripHtml(data.body_html).result,
      keywords: data.tags
    }

    if (data.variants.length) {
      // Get active product variant
      const variant = data.variants[data.variant]

      // Get SEO title
      const title = `${data.title} - ${variant.title}`

      // Get product variant image
      const variant_img = getProductImage(variant?.image_id, data.images, title)

      // Update SEO data
      seo = {
        ...seo,
        og: {
          image: variant_img.src,
          'image:alt': variant_img.alt || null,
          'image:height': variant_img.height,
          'image:secure_url': variant_img.src,
          'image:width': variant_img.width,
          'product:availability': available ? `${available}` : null,
          'product:brand': vendor || null,
          'product:condition': 'new',
          'product:price:amount': variant.price,
          'product:price:currency': 'USD'
        },
        title,
        twitter: { card: 'summary', image: variant_img.src }
      }
    } else {
      seo = {
        ...seo,
        og: {
          image: data.images[0].src,
          'image:alt': data.images[0].alt || null,
          'image:height': data.images[0].height,
          'image:secure_url': data.images[0].src,
          'image:width': data.images[0].width,
          'product:availability': 'true',
          'product:brand': vendor || null,
          'product:condition': 'new',
          'product:price:currency': 'USD'
        },
        title: data.title,
        twitter: { card: 'summary', image: data.images[0].src }
      }
    }
  } else {
    const data = page as Record<'seo', Partial<SEOProps>>
    seo = { ...seo, ...data.seo }
  }

  return seo
}

export default getSEOData
