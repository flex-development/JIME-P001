import type { OrNever } from '@flex-development/kustomzcore'
import { axios } from '@flex-development/kustomzcore/dist/axios'
import type { AxiosRequestConfig } from 'axios'

/**
 * @file Implementation - AppleAuthService
 * @module lib/services/AppleAuthService
 */

class AppleAuthService {
  /**
   * Returns a signed JSON web token to authenticate with the Apple Music API.
   *
   * @async
   * @return {Promise<string>} JWT to authenticate with Apple Music API
   * @throws {FeathersErrorJSON}
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

    return await axios<string>(config)
  }
}

export default AppleAuthService
