import pino from 'pino'

/**
 * @file Pino Configuration (Server Side)
 * @module pages/api/utils/logger
 *
 * @see {@link https://getpino.io/}
 * @see {@link https://github.com/pinojs/pino-pretty}
 * @see {@link https://docs.feathersjs.com/api/errors.html}
 */

export default pino({
  level: 'debug',
  prettyPrint: {
    colorize: true,
    errorProps: 'className,code,data,errors,message,name',
    ignore: 'hostname,pid',
    levelFirst: true,
    translateTime: true,
  },
})
