import { axios } from '@flex-development/kustomzcore'
import type { AxiosRequestConfig } from 'axios'

/**
 * @file Implementation - appleDeveloperToken
 * @module lib/utils/appleDeveloperToken
 */

const {
  APPLE_AUTHKEY_MUSICKIT: password = '',
  APPLE_AUTHKEY_MUSICKIT_KEY_ID: username = '',
  APPLE_TEAM_ID: team
} = process.env

/**
 * Returns a signed JSON web token to authenticate with the Apple Music API.
 *
 * @async
 * @throws {FeathersErrorJSON}
 */
const appleDeveloperToken = async (): Promise<string> => {
  const config: AxiosRequestConfig = {
    auth: { password, username },
    method: 'post',
    params: { team },
    url: 'https://adt-api.flexdevelopment.vercel.app/token'
  }

  return await axios<string>(config)
}

export default appleDeveloperToken
