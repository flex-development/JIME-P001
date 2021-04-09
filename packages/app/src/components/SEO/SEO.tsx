import type { SEOData } from '@core/types'
import type { NullishString } from '@flex-development/json/utils/types'
import NextHead from 'next/head'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useRef } from 'react'

/**
 * @file Inject SEO elements into <head> tag
 * @module components/SEO/impl
 * @see {@link https://nextjs.org/docs/api-reference/next/head}
 */

/**
 * Injects elements into the `<head>` tag.
 *
 * @param {SEOData} props - Component properties
 * @return {JSX.Element} `NextHead` component containing SEO html tags
 */
export const SEO: FC<SEOData> = (props: SEOData): JSX.Element => {
  const {
    description = '',
    keywords = '',
    og = {},
    title,
    twitter = {}
  } = props

  // Access router instance
  const router = useRouter()

  // Cannonical URL state
  const cannonical_url = useRef<string>('')

  // Update cannonical URL state
  useEffect(() => {
    if (typeof window === 'undefined' || cannonical_url.current?.length) return
    cannonical_url.current = `${window.location.origin}${router.asPath}`
  })

  /**
   * Formats the page SEO title.
   *
   * @param {NullishString} [title] - Page title, null, or undefined
   * @return {string} Formatted SEO title
   */
  const getTitleWithSuffix = (title?: NullishString): string => {
    return title?.length ? `${title} | Morena's Kustomz` : `Morena's Kustomz`
  }

  // Update social metadata
  og['description'] = description
  og['title'] = getTitleWithSuffix(title)
  og['url'] = cannonical_url.current
  twitter['description'] = description
  twitter['title'] = title

  return (
    <NextHead>
      {/* Page title, description, and keywords */}
      <title>{getTitleWithSuffix(title)}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />

      {/* Prevent duplicate content issues */}
      <link rel='canonical' href={cannonical_url.current} />

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
