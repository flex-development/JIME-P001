import type { request } from '@flex-development/kustomzcore/config/axios'

/**
 * @file Test Fixture - ADT API Request Config
 * @module lib/mixins/AppleAuth/tests/fixtures/developer-token-config
 * @see https://github.com/flex-development/adt-api
 */

export default {
  auth: {
    password: process.env.APPLE_AUTHKEY_MUSICKIT,
    username: process.env.APPLE_AUTHKEY_MUSICKIT_KEY_ID
  },
  method: 'post',
  params: { team: process.env.APPLE_TEAM_ID },
  url: 'https://adt-api.flexdevelopment.vercel.app/token'
} as Parameters<typeof request>[0]
