// Type definitions for @shopify/theme-images
// Definitions by: Lexus Drumgold <https://github.com/lexusdrumgold>

declare module '@shopify/theme-images' {
  /**
   * Adds a Shopify size attribute to a URL.
   *
   * @see https://shopify.dev/docs/themes/liquid/reference/filters/url-filters
   * 
   * @param {string} [src] - Image URL
   * @param {string | null} [size] - Image size attribute
   * @return {string | null} Image URL with size attribute or null
   */
  const getSizedImageUrl: (src?: string, size?: string | null) => string | null

  /**
   * Find the Shopify image attribute size.
   *
   * @param {string} src - Image URL
   * @return {string | null} Image size attribute or null
   */
  const imageSize: (src: string) => string | null

  /**
   * Loads and caches an image in the browsers cache.
   * 
   * @param {string} url - URL of image to load and cache
   * @return {void}
   */
  const loadImage: (url: string) => void

  /**
   * Preloads an image in memory and uses the browsers cache to store it until
   * needed.
   *
   * @param {string | string[]} images - Image URL or array of image URLs
   * @param {string} size - Shopify image size attribute
   * @return {void}
   */
  const preload: (images: string | string[], size: string) => void

  /**
   * Removes the protocol (`http` or `https`) from a URL.
   * 
   * @param {string} url - Image URL to remove protocol from
   * @return {string} Image URL without protocol
   */
  const removeProtocol: (url: string) => string

  export { getSizedImageUrl, imageSize, loadImage, preload, removeProtocol }
}
