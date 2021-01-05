import { useMemoCompare } from '@flex-development/kustomzdesign'
import { isFunction } from 'lodash'
import { useCallback, useEffect } from 'react'
import { useBoolean } from 'react-hanger/array/useBoolean'

/**
 * @file Implementation - useWebFontLoader
 * @module subdomains/app/hooks/useWebFontLoader/impl
 */

/**
 * Use the Web Font Loader library.
 *
 * @see https://github.com/typekit/webfontloader
 */
export const useWebFontLoader = (config: WebFont.Config): boolean => {
  // Track Webfont loading state
  const [webfonts, { setTrue: setWebFontsTrue }] = useBoolean(false)

  // Web Font Loader config state
  const $config = useMemoCompare<typeof config>(config)

  /**
   * Fires when the Web Fonts are loaded.
   */
  const handleLoading = () => {
    if (isFunction($config.loading)) $config.loading()
    setWebFontsTrue()
  }

  /* Callback version of `handleLoading` */
  const loading = useCallback(handleLoading, [$config, setWebFontsTrue])

  // Handle Webfont loading
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (!webfonts) {
      import('webfontloader').then(WebFont => {
        return setTimeout(() => WebFont.load({ ...$config, loading }), 2500)
      })
    }
  }, [$config, loading, webfonts])

  return webfonts
}
