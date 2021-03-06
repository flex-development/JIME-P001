import pino from 'pino'
import vercel from './vercel-env'

/**
 * @file Pino Logger Configuration
 * @module lib/config/logger
 *
 * @see {@link https://github.com/pinojs/pino}
 * @see {@link https://github.com/pinojs/pino-pretty}
 * @see {@link https://docs.feathersjs.com/api/errors.html}
 */

const Logger = pino({
  level: 'debug',
  prettyPrint: {
    colorize: true,
    errorProps: 'className,code,data,errors,message,name',
    ignore: 'hostname,pid',
    levelFirst: true,
    translateTime: true
  }
})

/**
 * Returns a Pino child logger.
 *
 * @param path - API request path
 */
export default (path: string): pino.Logger => Logger.child({ path, vercel })
