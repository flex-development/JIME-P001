import createError from '@kustomzcore/utils/createError'
import { existsSync, readdirSync, readFileSync } from 'fs'
import { Head } from 'next/document'
import { resolve } from 'path'

/**
 * @file Implementation - InlineStylesHead
 * @module components/InlineStylesHead/impl
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
 *
 * @class InlineStylesHead
 * @extends Head
 */
export class InlineStylesHead extends Head {
  /**
   * Returns an array of `<style>` elements containing the style information
   * from each CSS file in the `static/css` directory.
   *
   * @see https://github.com/vercel/vercel/issues/3083#issuecomment-654244864
   * @see https://github.com/vercel/next.js/issues/8251
   *
   * @todo Only inline CSS files with the extension `.critical.css`
   */
  getCssLinks(): JSX.Element[] | null {
    const dir = '.next/server/static/css'
    const resdir = resolve(process.cwd(), dir)

    if (!existsSync(resdir)) return []

    return readdirSync(resdir).map(file => {
      const $file = resolve(process.cwd(), dir, file)
      let __html = ''

      try {
        __html = readFileSync($file, 'utf-8')
      } catch (err) {
        throw createError(err.message, { file: $file })
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
