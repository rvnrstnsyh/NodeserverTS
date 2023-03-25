/*
|-------------------------------------------------------------------------------
| NodeserverTS Copyright © 2022 rvnrstnsyh All Rights Reserved
|-------------------------------------------------------------------------------
|
| Author    : Rivane Rasetiansyah <re@rvnrstnsyh.dev> (https://rvnrstnsyh.dev)
| GitHub    : https://github.com/rvnrstnsyh
| GitLab    : https://gitlab.com/rvnrstnsyh
|
*/

import morgan from 'morgan'

import { Request, Response } from 'express'
import { createLogger, transports, format } from 'winston'
import { logIFC, infoIFC, errorIFC } from '@helpers/interfaces/logger.interface'

const logger: object | any = createLogger({
  level: 'info',
  format: format.simple(),
  defaultMeta: { service: 'user:service' },
  transports: [
    new transports.File({ filename: 'combined.log' }),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.Console({
      level: 'info',
      handleExceptions: true,
    })
  ],
  exitOnError: false
})

const log: logIFC = (context, message, scope) => {
  const line: object = { context, scope, message: message.toString() }
  logger.info(line)
}

const info: infoIFC = (context, message, scope, meta) => {
  const line: object = { context, scope, message, meta }
  logger.info(line)
}

const error: errorIFC = (context, message, scope, meta) => {
  const line: object = { context, scope, message, meta }
  logger.error(line)
}

const init: any = (): object => {
  //
  return morgan((tokens: any, request: Request, Response: Response): any => {
    //
    const logData: object = {
      method: tokens.method(request, Response),
      url: tokens.url(request, Response),
      code: tokens.status(request, Response),
      contentLength: tokens.Response(request, Response, 'content-length'),
      responseTime: `${tokens['Responseponse-time'](request, Response, '0')}`, // in milisecond (ms)
      date: tokens.date(request, Response, 'iso'),
      ip: tokens['remote-addr'](request, Response)
    }
    const obj: object = {
      context: 'service-info',
      scope: 'audit-log',
      message: 'Logging service...',
      meta: logData
    }
    logger.info(obj)
  })
}

export { log, init, info, error }
