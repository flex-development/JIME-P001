import { Client } from '@yujinakayama/apple-music/client'

/**
 * @file Apple Music API Client Configuration
 * @module config/apple-music
 * @see https://github.com/yujinakayama/apple-music-node
 */

export default new Client({
  defaultLanguageTag: 'en',
  defaultStorefront: 'us',
  developerToken: process.env.APPLE_DEVELOPER_TOKEN || ''
})
