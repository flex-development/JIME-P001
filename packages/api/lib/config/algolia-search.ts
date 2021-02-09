import algolia from 'algoliasearch'

/**
 * @file Algolia Client Configuration
 * @module lib/config/algolia
 * @see https://www.algolia.com/doc/api-client/getting-started
 */

const { ALGOLIA_APP_ID: appId = '', ALGOLIA_API_KEY: apiKey = '' } = process.env

export default algolia(appId, apiKey)
