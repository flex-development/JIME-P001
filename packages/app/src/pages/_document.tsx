import NextDocument, {
  DocumentContext as Context,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

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
   * Injects the server side rendered styles into the `<head>` element. This is
   * required to server side render styled components.
   *
   * @see https://styled-components.com/docs/advanced#server-side-rendering
   *
   * @param ctx - Next.js Document context
   * @param ctx.asPath - Path (including the query) shown in the browser
   * @param ctx.err - Error object if thrown through rendering
   * @param ctx.pathname - Current route, path of the page in `/pages`
   * @param ctx.query - Query string section of URL parsed as an object
   * @param ctx.renderPage - Callback function that runs React's rendering logic
   * @param ctx.req - HTTP request object
   * @param ctx.res - HTTP response object
   */
  static async getInitialProps(ctx: Context): Promise<DocumentInitialProps> {
    const { renderPage } = ctx
    const sheet = new ServerStyleSheet()

    try {
      ctx.renderPage = () => {
        return renderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })
      }

      const initialProps = await super.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  /**
   * Renders the document.
   */
  render(): JSX.Element {
    return (
      <Html dir='ltr' lang='en'>
        <Head>
          {/* Set character encoding for the document */}
          <meta charSet='utf-8' />

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
          <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
          <meta name='theme-color' content='#ffffff' />

          {/* TODO: Update site verification token */}
          <meta name='google-site-verification' content='verification_token' />

          {/* SEO properties that don't need to be easily accessible */}
          <meta property='og:locale' content='en_US' />
          <meta property='og:site_name' content="Morena's Kustomz" />
          <meta property='og:type' content='website' />

          {/* WebFont Loader */}
          <script src='https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js' />

          {/* Apple MusicKit */}
          <script
            defer
            src='//js-cdn.music.apple.com/musickit/v1/musickit.js'
          />
        </Head>
        <body>
          <noscript>You need to enable JavaScript to view this site.</noscript>

          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
