import pino from 'pino'

/**
 * @file Pino Configuration (Client Side)
 * @module lib/logger
 * @see {@link https://getpino.io/#/docs/browser}
 */

export default pino({
  browser: {asObject: true},
  level: 'debug',
  prettyPrint: {
    colorize: true,
    errorProps: 'className,code,data,errors,message,name',
    ignore: 'hostname,pid',
    levelFirst: true,
    translateTime: true,
  },
})
