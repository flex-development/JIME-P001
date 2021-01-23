import { createError } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import { readFileSync } from 'fs'
import isUndefined from 'lodash/isUndefined'
import { join } from 'path'
import sharp from 'sharp'
import type { GetStaticAssetReq as Req } from '../../../lib/types'

/**
 * @file API Endpoint - Get Static Image Assets
 * @module api/assets/images/[filename]
 */

export default async ({ query }: Req, res: Res): Promise<void> => {
  const { filename, height, width } = query

  // Get extension from filename
  const filename_split = filename.split('.')
  const extension = filename_split[filename_split.length - 1]

  // Parse image resize dimensions
  const $height = height ? JSON.parse(`${height}`) : height
  const $width = width ? JSON.parse(`${width}`) : width

  try {
    let file = readFileSync(join(__dirname, '_files', filename))

    if (!isUndefined($height) || !isUndefined($width)) {
      file = await sharp(file).resize($width, $height).toBuffer()
    }

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
