import Logger from '@flex-development/kustomzcore/config/logger'
import { createError } from '@flex-development/kustomzcore/utils/createError'
import { readdirSync, readFileSync } from 'fs'
import { Head } from 'next/document'
import { resolve } from 'path'

/**
 * @file Implementation - InlineStylesHead
 * @module subdomains/app/components/InlineStylesHead/impl
 */

/**
 * Allows Critical CSS to be delivered via inline `<style>` tags.
 *
 * This solves the following Lighthouse warning:
 *
 * > "External stylesheets are blocking the first paint of your page.
 * > Consider delivering critical CSS via `<style>` tags and deferring
 * > non-critical styles".
 *
 * @see https://github.com/vercel/next-plugins/issues/238
 * @see https://github.com/vercel/next-plugins/issues/238#issuecomment-696623272
 */
export class InlineStylesHead extends Head {
  /**
   * Returns an array of `<style>` elements containing the style information
   * from each critical CSS file in {@param files.allFiles}.
   *
   * @see https://github.com/vercel/vercel/issues/3083#issuecomment-654244864
   * @see https://github.com/vercel/next.js/issues/8251
   *
   * @todo Only inline CSS files with the extension `.critical.css`
   */
  getCssLinks(): JSX.Element[] | null {
    const vercel = (process.env.VERCEL_URL || '').length > 0
    const dir = `.next/server${vercel ? 'less' : ''}/static/css`

    return readdirSync(resolve(process.cwd(), dir)).map(file => {
      const $file = resolve(process.cwd(), dir, file)
      let __html = ''

      try {
        __html = readFileSync($file, 'utf-8')
      } catch (err) {
        const error = createError(err.message, { file: $file })

        Logger.error({ 'InlineStylesHead.getCssLinks': error })
        throw error
      }

      return (
        <style
          dangerouslySetInnerHTML={{ __html }}
          key={file}
          nonce={this.props.nonce}
          type='text/css'
        />
      )
    })
  }
}
