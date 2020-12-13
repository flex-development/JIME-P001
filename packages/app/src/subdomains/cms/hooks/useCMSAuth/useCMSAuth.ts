import fetcher from '@app/config/fetcher'
import { useSignInWithCustomToken } from '@subdomains/app/hooks'
import { PreviewRes } from '@subdomains/cms/services'
import useSWR, { ConfigInterface } from 'swr'

/**
 * @file Enable/disable CMS using preview endpoint
 * @module subdomains/cms/hooks/useCMSAuth
 */

/**
 * `useCMSAuth` return type.
 */
export type UseCMSAuth = PreviewRes & {
  config: typeof CONFIG
  error?: Error
  key: typeof KEY
}

/**
 * `useSWR` configuration.
 */
const CONFIG: ConfigInterface<PreviewRes, Error> = {
  initialData: { preview: false, session: null },
  refreshWhenHidden: true
}

/**
 * URL endpoint (key) used to request preview handler.
 */
const KEY = '/api/preview'

/**
 *
 */
export const useCMSAuth = (): UseCMSAuth => {
  // Request preview mode handler
  const { data, error } = useSWR<PreviewRes, Error>(KEY, fetcher, CONFIG)

  // Sign-in authenticated user to access database and storage resources
  useSignInWithCustomToken(data?.session?.firebase_token)

  return {
    config: CONFIG,
    error,
    key: KEY,
    preview: data?.preview ?? false,
    session: data?.session ?? null
  }
}

export { CONFIG as SWR_CONFIG, KEY as PREVIEW_KEY }
