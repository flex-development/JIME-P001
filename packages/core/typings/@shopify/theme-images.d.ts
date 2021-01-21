// Type definitions for @shopify/theme-images
// Project: KustomzCore
// Definitions by: Lexus Drumgold <https://github.com/lexusdrumgold>

declare module '@shopify/theme-images' {
  /**
   * Adds a Shopify size attribute to a URL.
   *
   * - https://shopify.dev/docs/themes/liquid/reference/filters/url-filters#size-parameters
   *   
   * @param src - Image URL
   * @param size - Image size attribute
   */
  const getSizedImageUrl: (src?: string, size?: string | null) => string | null

  /**
   * Find the Shopify image attribute size.
   *
   * @param src - Image URL
   */
  const imageSize: (src: string) => string | null

  /**
   * Loads and caches an image in the browsers cache.
   * 
   * @param path - Image URL
  */
  const loadImage: (url: string) => void

  /**
   * Preloads an image in memory and uses the browsers cache to store it until
   * needed.
   *
   * @param images - A list of image urls
   * @param size - A shopify image size attribute
   */
  const preload: (images: string | string[], size: string) => void

  /**
   * Removes the protocal from a URL.
   * 
   * @param url - Image URL
   */
  const removeProtocol: (url: string) => string

  export { getSizedImageUrl, imageSize, loadImage, preload, removeProtocol }
}
