import { Client } from '@yujinakayama/apple-music'
import appleDeveloperToken from '../utils/streaming/appleDeveloperToken'

/**
 * @file Apple Music API Client Configuration
 * @module config/apple-music
 * @see https://github.com/yujinakayama/apple-music-node
 */

export default new Client({
  defaultLanguageTag: 'en',
  defaultStorefront: 'us',
  developerToken: appleDeveloperToken()
})
