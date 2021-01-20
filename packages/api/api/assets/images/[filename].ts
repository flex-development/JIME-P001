import { createError } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import { readFileSync } from 'fs'
import { join } from 'path'
import type { GetStaticAssetReq as Req } from '../../../lib/types'

/**
 * @file API Endpoint - Get Static Image Assets
 * @module api/assets/images/[filename]
 */

export default ({ query }: Req, res: Res): void => {
  const { filename } = query

  // Get extension from filename
  const filename_split = filename.split('.')
  const extension = filename_split[filename_split.length - 1]

  // Static image directory
  const dir = '../../static/images'

  try {
    const file = readFileSync(join(__dirname, dir, filename))

    res.writeHead(200, { 'Content-Type': `image/${extension}` })
    res.end(file)
  } catch (err) {
    const { message, ...erest } = err

    const data = { ...erest, errors: { filename } }
    const status = erest.code === 'ENOENT' ? 404 : 500
    const error = createError(message, data, status)

    debug('api/assets/images/[filename]')(error)
    res.status(error.code).json(error)
  }
}
