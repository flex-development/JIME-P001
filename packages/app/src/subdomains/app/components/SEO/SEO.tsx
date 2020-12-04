import { NullishString } from '@flex-development/json'
import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'

/**
 * @file Inject SEO elements into <head> tag
 * @module subdomains/app/components/SEO/impl
 * @see {@link https://nextjs.org/docs/api-reference/next/head}
 */

export interface SEOProps {
  /**
   * Description of the page in less than 150 characters.
   *
   * @default ''
   */
  description?: string

  /**
   * Comma-delimitted list of SEO keywords.
   *
   * @default ''
   */
  keywords?: string

  /**
   * Object containing Open Graph metadata.
   *
   * @default {}
   */
  og?: {
    category?: string
    image?: string
    'image:alt'?: string
    'image:height'?: number | string
    'image:secure_url'?: string
    'image:width'?: number | string
    'product:availability'?: string
    'product:brand'?: string
    'product:condition'?: string
    'product:price:amount'?: string
    'product:price:currency'?: string
    'product:item_group_id'?: string
    'product:retailer_item_id'?: string
  }

  /**
   * A title is used on all pages (SEO: Google calculates the pixel width of the
   * characters used in the title, and it cuts off between 472 and 482 pixels.
   * The average character limit would be around 55-characters).
   *
   * The value `| Morena's Kustomz` will be appended to the title if defined.
   *
   * @default "Morena's Kustomz"
   */
  title?: string

  /**
   * Object containing Twitter social metadata.
   *
   * @default {}
   */
  twitter?: {
    [x: string]: NullishString | undefined

    card?: 'app' | 'player' | 'summary' | 'summary_large_image' | null
    creator?: string
    image?: string
    site?: string
  }
}

/**
 * Injects elements into the `<head>` tag.
 */
export const SEO: FC<SEOProps> = (props: SEOProps) => {
  const {
    description = '',
    keywords = '',
    og = {},
    title,
    twitter = {}
  } = props

  // Get cannonical URL
  const { asPath } = useRouter()
  const cannonical_url = `${process.env.SITE_URL}${asPath}`

  const getTitleWithSuffix = (title?: NullishString) => {
    return title?.length ? `${title} | Morena's Kustomz` : `Morena's Kustomz`
  }

  // Update social metadata
  og['description'] = description
  og['title'] = getTitleWithSuffix(title)
  og['url'] = cannonical_url
  twitter['description'] = description
  twitter['title'] = title

  return (
    <NextHead>
      {/* Page title, description, and keywords */}
      <title>{getTitleWithSuffix(title)}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />

      {/* Facebook social meta tags */}
      {Object.keys(og).map(key => {
        const content = og[key]
        const property = key.startsWith('product:') ? key : `og:${key}`

        if (!content) return null
        return <meta property={property} content={content} key={property} />
      })}

      {/* Twitter social meta tags */}
      {Object.keys(twitter).map(key => {
        const content = twitter[key]
        const property = `twitter:${key}`

        if (!content) return null
        return <meta property={property} content={content} key={property} />
      })}
    </NextHead>
  )
}

SEO.defaultProps = {
  description: '',
  keywords: '',
  og: {},
  title: `Morena's Kustomz`,
  twitter: {}
}
