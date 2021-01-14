import Logger from '@flex-development/kustomzcore/config/logger'
import { createError } from '@flex-development/kustomzcore/utils/createError'
import mdx from '@mdx-js/mdx'
import { transform } from 'buble-jsx-only'
import { NextApiRequest as Req, NextApiResponse as Res } from 'next'

/**
 * @file Parse and transform MDX
 * @module pages/api/mdx
 */

export default async ({ body }: Req, res: Res): Promise<void> => {
  try {
    const jsx = mdx.sync(`${body}`, { skipExport: true }).trim()
    res.json(transform(jsx, { objectAssign: 'Object.assign' }))
  } catch (err) {
    const error = createError(err.messsage, { body })

    Logger.error({ 'api/mdx': error })
    res.status(error.code).json(error)
  }
}
