import { SEOProps } from '@app/subdomains/app/components/SEO'
import { ICMSPage } from '@app/subdomains/cms/models'
import { pick } from 'lodash'

/**
 * @file Get the SEO metadata from a page entity
 * @module subdomains/cms/utils/getCMSPageSEO/impl
 */

/**
 * Pulls the SEO metadata properties from {@param page}.
 *
 * @param page - New page data
 * @param page.component - `displayName` of component that renders page
 * @param page.content - Object containing template data or MD(X) string
 * @param page.description - Page description in less than 150 characters
 * @param page.draft - True if page should be marked as a draft
 * @param page.keywords - Comma-delimitted list of SEO keywords
 * @param page.path - URL path page can be accessed from
 * @param page.title - Title of page
 */
const getCMSPageSEO = (
  page: Partial<Pick<ICMSPage, 'description' | 'keywords' | 'title'>>
): SEOProps => {
  const seo: SEOProps = pick(page, ['description', 'keywords', 'title'])

  seo.og = {
    image: `${process.env.SITE_URL}/assets/morena.jpeg`,
    'image:alt': "Morena's profile picture",
    'image:height': '1080px',
    'image:width': '1080px'
  }

  seo.twitter = { card: 'summary', image: seo.og.image }

  return seo
}

export default getCMSPageSEO
