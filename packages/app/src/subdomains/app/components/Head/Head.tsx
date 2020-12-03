import { AnyObject, NullishString } from '@flex-development/json'
import { uuid } from '@flex-development/kustomzdesign'
import NextHead from 'next/head'
import { FC } from 'react'

/**
 * @file Inject elements into <head> tag
 * @module subdomains/app/components/Head/impl
 * @see {@link https://nextjs.org/docs/api-reference/next/head}
 */

/**
 * {@link Head} component properties.
 */
export type HeadProps = {
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
   * Facebook and Twitter social `<meta>` tag data.
   */
  social?: {
    og?: {
      image?: {
        /**
         * A description of what is in the OG image (not a caption).
         */
        alt?: NullishString

        /**
         * URL of the image that appears when content is shared to Facebook.
         *
         * Images need to be at least 600 x 315 pixels, although 1200 x
         * 630 pixels is recommended.
         */
        src: NullishString
      } | null
    }
    twitter?: {
      /**
       * Type of Twitter card to display.
       *
       * @default
       */
      card?: 'app' | 'player' | 'summary' | 'summary_large_image' | null

      /**
       * Username of page author, including the `@` symbol.
       */
      creator?: NullishString

      image?: {
        /**
         * URL of the image that appears when content is shared to Twitter.
         */
        src: NullishString
      } | null

      /**
       * Username of company account, including the `@` symbol.
       */
      site?: NullishString
    }
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
   * Cannonical URL of the current page.
   */
  url?: string
}

/**
 * Injects elements into the `<head>` tag.
 */
export const Head: FC<HeadProps> = ({
  description,
  keywords,
  social = {},
  title,
  url = process.env.SITE_URL
}: HeadProps) => {
  const { og, twitter } = social as Record<string, AnyObject>
  const site_name = "Morena's Kustomz"

  return (
    <NextHead>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, viewport-fit=cover'
      />

      <title>{title?.length ? `${title} | Morena's Kustomz` : title}</title>

      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />

      {/* Facebook social meta tags */}
      {url && <meta property='og:url' content={url} />}
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      {og?.image?.src && [
        <meta property='og:image' content={og.image.src} key={uuid()} />,
        <meta property='og:image:width' content='1200' key={uuid()} />,
        <meta property='og:image:height' content='630' key={uuid()} />
      ]}
      {og?.image?.alt && (
        <meta property='og:image:alt' content={og.image.alt} />
      )}

      <meta property='og:description' content={description} />
      <meta property='og:site_name' content={site_name} />
      <meta property='og:locale' content='en_US' />

      {/* Twitter social meta tags */}
      {twitter.card && <meta name='twitter:card' content={twitter.card} />}
      {twitter.site && <meta name='twitter:site' content={twitter.site} />}
      {twitter.creator && (
        <meta name='twitter:creator' content={twitter.creator} />
      )}
      {url && <meta property='twitter:url' content={url} />}
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      {twitter?.image?.src && (
        <meta name='twitter:image' content={twitter?.image.src} />
      )}
    </NextHead>
  )
}

Head.defaultProps = {
  description: '',
  keywords: '',
  social: {
    og: {
      image: null
    },
    twitter: {
      card: null,
      creator: null,
      image: null,
      site: null
    }
  },
  title: "Morena's Kustomz"
}
