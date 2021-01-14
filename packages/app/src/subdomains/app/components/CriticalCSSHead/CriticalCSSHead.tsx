import { existsSync, readFileSync } from 'fs'
import { Head } from 'next/document'
import { join } from 'path'

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
   * from each critical CSS file in {@param context.allFiles}.
   *
   * @todo Only inline CSS files with the extension `.crtical.css`
   *
   * @param context - Object with array of file paths
   * @param context.allFiles - All filepaths
   */
  getCssLinks({ allFiles }: Parameters<Head['getCssLinks']>[0]): JSX.Element[] {
    // Get all critical CSS files
    const css = allFiles.filter(file => file.endsWith('.css'))

    // Next directory to read files from
    const dir = '.next'

    // `.next` directory doesn't exist until build (`next build`) is completed
    if (!existsSync(dir)) return []

    // Return <style> elements
    return css.map(file => {
      const path = join(dir, file)
      const __html = existsSync(path) ? readFileSync(path, 'utf-8') : ''

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
