import type { NullishString } from '@flex-development/json/utils/types'
import type { SEOData } from '@kapi/types'
import NextHead from 'next/head'
import { useRouter } from 'next/router'
import type { FC } from 'react'

/**
 * @file Inject SEO elements into <head> tag
 * @module subdomains/app/components/SEO/impl
 * @see {@link https://nextjs.org/docs/api-reference/next/head}
 */

/**
 * Injects elements into the `<head>` tag.
 */
export const SEO: FC<SEOData> = props => {
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

      {/* Prevent duplicate content issues */}
      <link rel='canonical' href={cannonical_url} />

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

SEO.displayName = 'SEO'

SEO.defaultProps = {
  description: '',
  keywords: '',
  og: {},
  title: `Morena's Kustomz`,
  twitter: {}
}
