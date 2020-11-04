import NextDocument, {
  DocumentContext as Context,
  DocumentInitialProps as InitialProps,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'
import React from 'react'
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
export default class Document extends NextDocument {
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
  static async getInitialProps(ctx: Context): Promise<InitialProps> {
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
   *
   * @todo Favicons
   * @todo Apple Web App Meta
   * @todo Windows Tiles
   * @todo Update site verification token
   *
   */
  render(): JSX.Element {
    return (
      <Html lang='en'>
        <Head>
          {/* 
            Set the character encoding for this document, so that a characters within the UTF-8 space (such as emoji) are render correctly.
          */}
          <meta charSet='utf-8' />

          {/* TODO: Favicons */}

          {/* TODO: Apple Web App Meta */}

          {/* TODO: Windows Tiles */}

          {/* TODO: Update site verification token */}
          <meta name='google-site-verification' content='verification_token' />

          {/* Material Icons */}
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined'
          />

          {/* Font Awesome */}
          <script
            crossOrigin='anonymous'
            src='https://kit.fontawesome.com/0691581d45.js'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
