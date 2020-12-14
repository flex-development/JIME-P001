import fetcher from '@app/config/fetcher'
import { useSignInWithCustomToken } from '@subdomains/app/hooks'
import { PreviewRes } from '@subdomains/cms/services'
import useSWR, { ConfigInterface } from 'swr'
import { TinaCMS, useCMS } from 'tinacms'

/**
 * @file Enable/disable CMS using preview endpoint
 * @module subdomains/cms/hooks/useCMSAuth
 */

/**
 * `useCMSAuth` return type.
 */
export type UseCMSAuth = PreviewRes & {
  cms: TinaCMS
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
 * Requests the `/api/preview` endpoint to check if the user is authenticated
 * with GitHub. CMS users are GitHub repository collaborators.
 *
 * If the user is authenticated, their custom token will be used to grant them
 * access to database and storage resources.
 */
export const useCMSAuth = (): UseCMSAuth => {
  // Request preview mode handler
  const { data, error } = useSWR<PreviewRes, Error>(KEY, fetcher, CONFIG)

  // Grant access to database and storage resources
  useSignInWithCustomToken(data?.session?.firebase_token)

  // Access CMS instance
  const cms = useCMS()

  return {
    cms,
    config: CONFIG,
    error,
    key: KEY,
    preview: data?.preview ?? false,
    session: data?.session ?? null
  }
}

export { CONFIG as SWR_CONFIG, KEY as PREVIEW_KEY }
