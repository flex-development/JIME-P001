import {
  InlineStylesHead,
  OptimizedNextScript
} from '@subdomains/app/components'
import type { DocumentInitialProps } from 'next/document'
import NextDocument, { Html, Main } from 'next/document'

/**
 * @file Custom Next.js Document
 * @module pages/document
 * @see https://nextjs.org/docs/advanced-features/custom-document
 */

/**
 * Augments the application's `<html>` and `<body>` tags.
 *
 * @class Document
 */
export default class Document extends NextDocument<DocumentInitialProps> {
  /**
   * Renders the document.
   */
  render(): JSX.Element {
    return (
      <Html dir='ltr' lang='en'>
        <InlineStylesHead>
          {/* Set character encoding for the document */}
          <meta charSet='utf-8' />

          {/* SEO properties that don't need to be easily accessible */}
          <meta property='og:locale' content='en_US' />
          <meta property='og:site_name' content={process.env.SITE_NAME} />
          <meta property='og:type' content='website' />

          {/* Reference humans.txt file */}
          <link rel='author' href='/humans.txt' />

          {/* Favicons & App Icons*/}
          <link
            rel='apple-touch-icon'
            sizes='57x57'
            href='/apple-icon-57x57.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='60x60'
            href='/apple-icon-60x60.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='72x72'
            href='/apple-icon-72x72.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='76x76'
            href='/apple-icon-76x76.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='114x114'
            href='/apple-icon-114x114.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='120x120'
            href='/apple-icon-120x120.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='144x144'
            href='/apple-icon-144x144.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='/apple-icon-152x152.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-icon-180x180.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='192x192'
            href='/android-icon-192x192.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='96x96'
            href='/favicon-96x96.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='manifest' href='/manifest.json' />
          <meta name='msapplication-TileColor' content='#ffffff' />
          <meta name='msapplication-TileImage' content='ms-icon-144x144.png' />
          <meta name='theme-color' content='#ffffff' />

          {/* Google site verification token */}
          <meta
            name='google-site-verification'
            content={process.env.GOOGLE_SITE_VERIFICATION}
          />

          {/* Web Font Loader */}
          <script
            defer
            src='//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
          />

          {/* 
            Process API connections asap
            https://web.dev/efficiently-load-third-party-javascript/#preconnect
          */}
          <link rel='preconnect' href={process.env.API_URL} />
        </InlineStylesHead>
        <body>
          <noscript>You need to enable JavaScript to view this site.</noscript>

          <Main />

          <OptimizedNextScript mode='defer' />
        </body>
      </Html>
    )
  }
}
