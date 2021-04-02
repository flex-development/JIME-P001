import type { OrNever } from '@flex-development/kustomzcore'
import { request } from '@flex-development/kustomzcore/config/axios'
import type { AxiosRequestConfig } from 'axios'

/**
 * @file Implementation - Apple Authentication Mixin
 * @module lib/services/AppleAuth
 */

/**
 * Handles authentication with Apple APIs.
 *
 * @class
 */
class AppleAuth {
  /**
   * Returns a signed JSON web token to authenticate with the Apple Music API.
   *
   * @see https://github.com/flex-development/adt-api
   *
   * @async
   * @return {Promise<string>} JWT to authenticate with Apple Music API
   * @throws {ErrorJSON}
   */
  static async developerToken(): OrNever<Promise<string>> {
    const {
      APPLE_AUTHKEY_MUSICKIT: password = '',
      APPLE_AUTHKEY_MUSICKIT_KEY_ID: username = '',
      APPLE_TEAM_ID: team
    } = process.env

    const config: AxiosRequestConfig = {
      auth: { password, username },
      method: 'post',
      params: { team },
      url: 'https://adt-api.flexdevelopment.vercel.app/token'
    }

    return await request<string>(config)
  }
}

export default AppleAuth
