import type {
  CollectionListingImage as CollectionImage,
  GetCollectionResJSON as Collection,
  GetPageResJSON as Page,
  GetPolicyResJSON as Policy,
  GetProductResJSON as Product,
  IObjectMetafield,
  IProductImage,
  IProductListingVariant,
  OrNever,
  OrPromise,
  SEOData
} from '@flex-development/kustomzcore'
import ofa from '@flex-development/kustomzcore/utils/objectFromArray'
import findIndex from 'lodash/findIndex'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'
import { stripHtml } from 'string-strip-html'
import { API_URL } from '../config/constants'
import Metafields from './MetafieldService'

/**
 * @file Implementation - SEOService
 * @module services/SEOService
 */

/**
 * Handles interactions with SEO data for API resources.
 *
 * @class
 */
class SEOService {
  /**
   * @property {object} DEFAULT_IMAGE_PROPS - Default SEO image properties
   * @property {number} DEFAULT_IMAGE_PROPS.height - Image height
   * @property {string} DEFAULT_IMAGE_PROPS.src - Image URL
   * @property {number} DEFAULT_IMAGE_PROPS.width - Image width
   */
  static DEFAULT_IMAGE_PROPS = {
    height: 1920,
    src: `${API_URL}/assets/images/morena`,
    width: 1920
  }

  /**
   * Returns an object with SEO data for a collection listing resource.
   *
   * @async
   * @param {OrPromise<Collection>} listing - Collecting listing data
   * @param {Product[]} [products] - Product listings in collection
   * @return {Promise<SEOData>} Promise containing SEO data
   * @throws {FeathersErrorJSON}
   */
  static async collection(
    listing: OrPromise<Collection>,
    products: Product[] = []
  ): OrNever<Promise<SEOData>> {
    const {
      body_html = '',
      default_product_image,
      image: cimage,
      title = ''
    } = await listing

    // Get global SEO data
    const global = await SEOService.global()

    // Get collection image
    const image = (cimage || default_product_image || {}) as CollectionImage

    // Initialize keywords array
    let keywords: string[] = [...(global.keywords?.split(',') ?? [])]

    // Build keywords from product tags
    products.forEach(product => {
      const tags_array = (product.tags ?? '').split(',')
      keywords = keywords.concat(SEOService.formatKeywords(...tags_array))
    })

    return merge(global, {
      description: stripHtml(body_html.trim()).result,
      keywords: SEOService.formatKeywords(...keywords),
      og: {
        image: image.src ?? null,
        'image:alt': image?.alt ?? null,
        'image:height': image?.height ?? null,
        'image:secure_url': image.src ?? null,
        'image:width': image?.width ?? null
      },
      title: `Collections - ${title}`,
      twitter: { image: image.src ?? null }
    })
  }

  /**
   * Returns a string containing SEO keywords.
   *
   * @param {string[]} args - Array of keywords
   * @return {string} Comma-separated list of SEO keywords
   */
  static formatKeywords(...args: string[]): string {
    const keywords: string[] = []

    args.forEach(arg => {
      if (arg) keywords.push(`${arg}`.trim().toLowerCase())
    })

    return join(uniq(keywords), ',')
  }

  /**
   * Returns an object with global SEO data.
   *
   * @async
   * @return {Promise<SEOData>} Promise containing base SEO object
   * @throws {FeathersErrorJSON}
   */
  static async global(): OrNever<Promise<SEOData>> {
    // Get global SEO data from shop metafields
    const {
      description: { value: description = '' },
      keywords: { value: keywords = '' },
      social_share_image: { value: social_share_image = '' }
    } = await Metafields.globals()

    // Parse social share image
    let og_image = SEOService.DEFAULT_IMAGE_PROPS.src
    if ((social_share_image as string).length) {
      const social_image = JSON.parse(social_share_image as string)
      og_image = social_image[0].cloudinary_src
    }

    return {
      description: description as string,
      keywords: SEOService.formatKeywords(...(keywords as string).split(',')),
      og: {
        image: og_image,
        'image:alt': `Morena's profile picture`,
        'image:height': SEOService.DEFAULT_IMAGE_PROPS.height,
        'image:width': SEOService.DEFAULT_IMAGE_PROPS.width
      },
      twitter: { card: 'summary', image: og_image }
    }
  }

  /**
   * Returns `true` if the `seo` field should be included for an API resource.
   *
   * @param {string} fields - Comma-separated list of fields to include
   * @return {boolean} `true` if `seo` field should be included
   */
  static includeSEO(fields: string = ''): boolean {
    const include = fields.includes('*') || fields.includes('seo')
    return include && !fields.includes('-seo')
  }

  /**
   * Returns an object with SEO data for a page resource.
   *
   * @async
   * @param {OrPromise<Page>} page - Page data
   * @return {Promise<SEOData>} Promise containing SEO data
   * @throws {FeathersErrorJSON}
   */
  static async page(page: OrPromise<Page>): OrNever<Promise<SEOData>> {
    const { metafield = [] } = await page

    // Get global SEO data
    const global = await SEOService.global()

    // Get SEO from metafields
    const seo_meta = ofa<IObjectMetafield>(metafield, 'key')

    // Get array of page keywords
    const keywords: string[] = [
      ...(global.keywords?.split(',') ?? []),
      ...(((seo_meta?.keywords?.value as string) ?? '').split(',') ?? [])
    ]

    return merge(global, {
      description: seo_meta.description_tag?.value ?? null,
      keywords: SEOService.formatKeywords(...keywords),
      title: seo_meta.title_tag?.value ?? null
    })
  }

  /**
   * Returns an object with SEO data for a policy resource.
   *
   * @async
   * @param {OrPromise<Policy>} policy - Policy data
   * @return {Promise<SEOData>} Promise containing SEO data
   * @throws {FeathersErrorJSON}
   */
  static async policy(policy: OrPromise<Policy>): OrNever<Promise<SEOData>> {
    const { title = '' } = await policy

    return merge(await SEOService.global(), {
      description: `${title} | Morena's Kustomz`,
      title
    })
  }

  /**
   * Returns an object with SEO data for a product listing resource.
   *
   * @async
   * @param {OrPromise<Product>} listing - Product listing data
   * @param {string} [sku] - SKU of variant to generate SEO for
   * @return {Promise<SEOData>} Promise containing SEO data
   * @throws {FeathersErrorJSON}
   */
  static async product(
    listing: OrPromise<Product>,
    sku: IProductListingVariant['sku'] = ''
  ): OrNever<Promise<SEOData>> {
    listing = await listing
    const {
      available,
      body_html = '',
      images = [],
      tags = '',
      title = '',
      variants = [],
      vendor = null
    } = listing

    // Initialize SEO object
    let seo: SEOData = {
      description: stripHtml(body_html.trim()).result,
      keywords: SEOService.formatKeywords(...tags.trim().split(',')),
      twitter: { card: 'summary' }
    }

    if (variants.length) {
      // Get index of active variant
      let active = 0
      if (!isEmpty(sku)) active = findIndex(variants, v => v.sku === sku)

      // Get active product variant
      const variant = variants[active < 0 ? 0 : active]
      const { image_id } = variant

      // Get SEO title (parent product title and product variant title)
      const title_wv = `${title} - ${variant.title}`

      // Get product variant image
      let vimg = images.find(({ id }) => id === image_id)

      if (!vimg) {
        const img = { ...SEOService.DEFAULT_IMAGE_PROPS, alt: title_wv }
        vimg = img as IProductImage
      }

      // Update SEO data
      seo = merge(seo, {
        og: {
          image: vimg?.src,
          'image:alt': vimg.alt,
          'image:height': vimg.height,
          'image:secure_url': vimg.src,
          'image:width': vimg.width,
          'product:price:amount': variant.price
        },
        title: !isEmpty(sku) ? title_wv : title,
        twitter: { image: vimg.src }
      })
    } else {
      const image = images[0] || SEOService.DEFAULT_IMAGE_PROPS

      seo = merge(seo, {
        og: {
          image: image.src,
          'image:alt': image.alt,
          'image:height': image.height,
          'image:secure_url': image.src,
          'image:width': image.width
        },
        title: title,
        twitter: { image: image.src }
      })
    }

    return merge(seo, {
      'product:availability': available ? `${available}` : null,
      'product:brand': vendor,
      'product:condition': 'new',
      'product:price:currency': 'USD'
    })
  }
}

export default SEOService
