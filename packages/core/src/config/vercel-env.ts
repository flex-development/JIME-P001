import { serialize } from '@flex-development/json'

/**
 * @file Common Vercel System Environment Variables
 * @module config/vercel-env
 */

export default serialize({
  branch: process.env.VERCEL_GIT_COMMIT_REF || '',
  commit: process.env.VERCEL_GIT_COMMIT_SHA || '',
  env: process.env.VERCEL_ENV || ''
})
