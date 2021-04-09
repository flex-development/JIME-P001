import { useMemoCompare } from '@design/hooks/useMemoCompare'
import isFunction from 'lodash/isFunction'
import { useCallback, useEffect } from 'react'
import { useBoolean } from 'react-hanger/array/useBoolean'

/**
 * @file Implementation - useWebFontLoader
 * @module hooks/useWebFontLoader/impl
 */

/**
 * Use the Web Font Loader library.
 *
 * @see https://github.com/typekit/webfontloader
 *
 * @param {WebFont.Config} config - WebFont loader configuration
 * @return {boolean} `true` if webfonts are loaded, `false` otherwise
 */
export const useWebFontLoader = (config: WebFont.Config): boolean => {
  // Track Webfont loading state
  const [webfonts, { setTrue: setWebFonts }] = useBoolean(false)

  // Web Font Loader config state
  const $config = useMemoCompare<typeof config>(config)

  /**
   * Fires when the Web Fonts are loaded.
   */
  const handleLoading = () => {
    if (isFunction($config.loading)) $config.loading()
    setTimeout(() => setWebFonts(), 2000)
  }

  /* Callback version of `handleLoading` */
  const loading = useCallback(handleLoading, [$config, setWebFonts])

  // Handle Webfont loading
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (!webfonts) {
      import('webfontloader').then(WebFont => {
        return WebFont.load({ ...$config, loading })
      })
    }
  }, [$config, loading, webfonts])

  return webfonts
}
