import pino from 'pino'

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
 * Every log will have a `namespace` key with the value of {@param namespace}.
 *
 * @param namespace - Log namespace
 */
const log = (namespace: string): pino.Logger => {
  return Logger.child({ commit: process.env.SENTRY_RELEASE, namespace })
}

export default log
