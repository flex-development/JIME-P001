import pino from 'pino'
import vercel from '../vercel-env'

/**
 * @file Pino Logger Configuration
 * @module config/logger
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
 * @param {string} log - Unique log ID
 * @return {pino.Logger} Pino child logger instance
 */
export default (log: string): pino.Logger => Logger.child({ log, vercel })
