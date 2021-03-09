import pino from 'pino'
import vercel from './vercel-env'

/**
 * @file Pino Logger Configuration
 * @module config/logger
 *
 * @see {@link https://github.com/pinojs/pino}
 * @see {@link https://github.com/pinojs/pino-pretty}
 * @see {@link https://docs.feathersjs.com/api/errors.html}
 */

export const Logger = pino({
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
 * @param {string} route - Next.js page or API route log was captured from
 * @return {pino.Logger} Pino child logger instance
 */
const log = (route: string): pino.Logger => Logger.child({ ...vercel, route })

export default log
