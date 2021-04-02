import type { ANYTHING, PartialOr } from '@flex-development/json'
import type {
  ICollectionListing as Collection,
  IMetafield,
  IPolicy as Policy,
  IProductImage,
  IProductListing as Product,
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
import { API_URL } from '../../config/constants'
import ShopifyAPI from '../ShopifyAPI'

/**
 * @file Implementation - SEO Mixin
 * @module lib/mixins/SEO
 */

/**
 * Generates SEO data for Shopify Admin REST API resources.
 *
 * @class
 */
class SEO {
  /**
   * @property {object} DEFAULT_IMAGE_PROPS - Default SEO image properties
   * @property {number} DEFAULT_IMAGE_PROPS.height - Image height
   * @property {string} DEFAULT_IMAGE_PROPS.src - Image URL
   * @property {number} DEFAULT_IMAGE_PROPS.width - Image width
   */
  static DEFAULT_IMAGE_PROPS = {
    height: 1920,
    src: `${API_URL}assets/images/morena`,
    width: 1920
  }

  /**
   * Returns an object with SEO data for a collection listing resource.
   *
   * @async
   * @param {OrPromise<Partial<Collection>>} listing - Collection listing data
   * @param {PartialOr<Product>[]} [products] - Product listings in collection
   * @return {Promise<SEOData>} Promise containing SEO data
   */
  static async collection(
    listing: OrPromise<Partial<Collection>>,
    products: PartialOr<Product>[] = []
  ): OrNever<Promise<SEOData>> {
    const {
      body_html = '',
      default_product_image,
      image: cimage,
      title = ''
    } = await listing

    // Get global SEO data
    const global = await SEO.global()

    // Get collection image
    const image = (cimage || default_product_image || {}) as IProductImage

    // Initialize keywords array
    let keywords: string[] = []

    // Build keywords from product tags
    products.forEach(product => {
      keywords = keywords.concat(SEO.formatKeywords(product.tags))
    })

    return merge(global, {
      description: stripHtml(body_html.trim()).result,
      keywords: SEO.formatKeywords(global.keywords, keywords),
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
   * @param {ANYTHING[]} args - Array of keywords
   * @return {string} Comma-separated list of SEO keywords
   */
  static formatKeywords(...args: ANYTHING[]): string {
    const keywords: string[] = []

    args.forEach(arg => {
      if (typeof arg === 'string') {
        arg = arg.trim().toLowerCase()

        // Handle formatted keywords as string
        const asplit = arg.split(',')

        // Push to Array logic
        asplit.length > 1 ? (arg = asplit) : arg.length && keywords.push(arg)
      }

      if (Array.isArray(arg)) {
        const keywords_inner = SEO.formatKeywords(...arg)
        keywords_inner.split(',').forEach(keyword => keywords.push(keyword))
      }
    })

    return join(uniq(keywords), ',')
  }

  /**
   * Returns an object with global SEO data.
   *
   * @async
   * @return {Promise<SEOData>} Promise containing base SEO object
   */
  static async global(): OrNever<Promise<SEOData>> {
    // Get global SEO data from shop metafields
    const {
      description: { value: description = '' },
      keywords: { value: keywords = '' },
      social_share_image: { value: social_share_image = '' }
    } = await ShopifyAPI.metafieldGlobals()

    // Parse social share image
    let og_image = SEO.DEFAULT_IMAGE_PROPS.src
    if ((social_share_image as string).length) {
      const social_image = JSON.parse(social_share_image as string)
      og_image = social_image[0].cloudinary_src
    }

    return {
      description: description as string,
      keywords: SEO.formatKeywords(keywords),
      og: {
        image: og_image,
        'image:alt': `Morena's profile picture`,
        'image:height': SEO.DEFAULT_IMAGE_PROPS.height,
        'image:width': SEO.DEFAULT_IMAGE_PROPS.width
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
   * @param {OrPromise<IMetafield[]>} [metafield] - Page metafields
   * @return {Promise<SEOData>} Promise containing SEO data
   */
  static async page(
    metafield: OrPromise<IMetafield[]> = []
  ): OrNever<Promise<SEOData>> {
    metafield = await metafield

    // Get global SEO data
    const global = await SEO.global()

    // Get SEO from metafields
    const seo = ofa<IMetafield>(metafield, 'key')

    return merge(global, {
      description: seo.description_tag?.value ?? null,
      keywords: SEO.formatKeywords(global.keywords, seo.keywords?.value),
      title: seo.title_tag?.value ?? null
    })
  }

  /**
   * Returns an object with SEO data for a policy resource.
   *
   * @async
   * @param {OrPromise<Partial<Policy>>} policy - Policy data
   * @return {Promise<SEOData>} Promise containing SEO data
   */
  static async policy(
    policy: OrPromise<Partial<Policy>>
  ): OrNever<Promise<SEOData>> {
    const { title = '' } = await policy

    return merge(await SEO.global(), {
      description: `${title} | Morena's Kustomz`,
      title
    })
  }

  /**
   * Returns an object with SEO data for a product listing resource.
   *
   * @async
   * @param {OrPromise<Partial<Product>>} listing - Product listing data
   * @param {string} [sku] - SKU of variant to generate SEO for
   * @return {Promise<SEOData>} Promise containing SEO data
   */
  static async product(
    listing: OrPromise<Partial<Product>>,
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
      keywords: SEO.formatKeywords(tags),
      twitter: { card: 'summary' }
    }

    if (variants.length) {
      // Get index of active variant
      let active = 0
      if (!isEmpty(sku)) active = findIndex(variants, v => v.sku === sku)

      // Get active product variant
      const variant = variants[active < 0 ? 0 : active]
      const { available: va, image_id } = variant

      // Get SEO title (parent product title and product variant title)
      const title_wv = `${title} - ${variant.title}`

      // Get product variant image
      let vimg = images.find(({ id }) => id === image_id)

      if (!vimg) {
        const img = { ...SEO.DEFAULT_IMAGE_PROPS, alt: title_wv }
        vimg = img as IProductImage
      }

      // Update SEO data
      seo = merge(seo, {
        og: {
          image: vimg?.src,
          'image:alt': vimg.alt || title_wv,
          'image:height': vimg.height,
          'image:secure_url': vimg.src,
          'image:width': vimg.width,
          'product:price:amount': variant.price
        },
        'product:availability': typeof va === 'boolean' ? `${va}` : null,
        title: !isEmpty(sku) ? title_wv : title,
        twitter: { image: vimg.src }
      })
    } else {
      const image = images[0] || SEO.DEFAULT_IMAGE_PROPS

      seo = merge(seo, {
        og: {
          image: image.src,
          'image:alt': image.alt,
          'image:height': image.height,
          'image:secure_url': image.src,
          'image:width': image.width
        },
        'product:availability':
          typeof available === 'boolean' ? `${available}` : null,
        title: title,
        twitter: { image: image.src }
      })
    }

    return merge(seo, {
      'product:brand': vendor,
      'product:condition': 'new',
      'product:price:currency': 'USD'
    })
  }
}

export default SEO
