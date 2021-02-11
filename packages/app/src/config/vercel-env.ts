/**
 * @file Common Vercel System Environment Variables
 * @module config/vercel-env
 */

export default {
  branch: process.env.VERCEL_GIT_COMMIT_REF || '',
  commit: process.env.SENTRY_RELEASE || '',
  env: process.env.VERCEL_ENV || ''
}
