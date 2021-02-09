/**
 * @file Common Vercel System Environment Variables
 * @module lib/config/vercel-env
 */

export default {
  branch: process.env.VERCEL_GIT_COMMIT_REF || '',
  commit: process.env.VERCEL_GIT_COMMIT_SHA || '',
  env: process.env.VERCEL_ENV || ''
}
