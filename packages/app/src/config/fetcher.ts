import { ANYTHING } from '@flex-development/json'

/**
 * @file Request URLs using Fetch API
 * @module config/fetcher
 */

/**
 * Requests {@param url} using the Fetch API.
 *
 * @async
 * @param url - Request URL
 */
async function fetcher<T = ANYTHING>(url: string): Promise<T> {
  const res = await fetch(url)

  console.debug({ res: res || null })

  return await res.json()
}

export default fetcher
