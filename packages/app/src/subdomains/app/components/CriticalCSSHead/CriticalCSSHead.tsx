import Logger from '@flex-development/kustomzcore/config/logger'
import { createError } from '@flex-development/kustomzcore/utils/createError'
import fs from 'fs'
import nextConfig from 'next/config'
import { Head } from 'next/document'
import path from 'path'

/**
 * @file Implementation - CriticalCSSHead
 * @module subdomains/app/components/CriticalCSSHead/impl
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
export class CriticalCSSHead extends Head {
  /**
   * Returns an array of `<style>` elements containing the style information
   * from each critical CSS file in {@param files.allFiles}.
   *
   * @todo Only inline CSS files with the extension `.crtical.css`
   *
   * @param files - Object with array of file paths
   * @param files.allFiles - All filepaths
   */
  getCssLinks(files: Parameters<Head['getCssLinks']>[0]): JSX.Element[] | null {
    // Next.js build directory
    const dir = `${nextConfig().serverRuntimeConfig.PROJECT_ROOT}/.next`

    // Filter out CSS files
    const css = files.allFiles.filter(file => file.endsWith('.css'))

    return css.map(file => {
      let __html = ''

      try {
        __html = fs.readFileSync(path.join(dir, file), 'utf-8')
      } catch (err) {
        const error = createError(err.message, { dir, file })

        Logger.error({ 'CriticalCSSHead.getCssLinks': error })
        return <link href={`./_next/${file}`} key={file} rel='stylesheet' />
      }

      return (
        <style
          dangerouslySetInnerHTML={{ __html }}
          key={file}
          nonce={this.props.nonce}
        />
      )
    })
  }
}
