import Logger from '@flex-development/kustomzcore/config/logger'
import { createError } from '@flex-development/kustomzcore/utils/createError'
import fs from 'fs'
import { Head } from 'next/document'
import path from 'path'

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
   *
   * @param files - Object with array of file paths
   * @param files.allFiles - All filepaths
   */
  getCssLinks(files: Parameters<Head['getCssLinks']>[0]): JSX.Element[] | null {
    // Next build directory
    const dir = '.next'

    // Filter out CSS files
    const css = files.allFiles.filter(file => file.endsWith('.css'))

    console.debug(fs.readdirSync(path.resolve(process.cwd(), dir)))

    // Return <style> elements with CSS or fallback <link> elements
    return css.map(file => {
      const $file = path.resolve(process.cwd(), dir, file)
      let __html = ''

      try {
        __html = fs.readFileSync($file, 'utf-8')
      } catch (err) {
        const error = createError(err.message, { file: $file })

        Logger.error({ 'InlineStylesHead.getCssLinks': error })
        return <link href={`/_next/${file}`} key={file} rel='stylesheet' />
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
