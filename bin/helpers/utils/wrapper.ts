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

import * as logger from '@helpers/utils/logger'

import { Response } from 'express'
import { ERROR as httpError } from '@helpers/errors/status_code'
import { cookieIFC, cookieConfig } from '@helpers/interfaces/cookie.interface'
import {
  NotFoundError, InternalServerError, BadRequestError, ConflictError, ExpectationFailedError,
  ForbiddenError, GatewayTimeoutError, ServiceUnavailableError, UnauthorizedError
} from '@helpers/errors'
//
interface dataIFC {
  (data: object): object
}
interface paginationDataIFC {
  (data: object, meta: object): object
}
interface errorIFC {
  (error: object): object
}
interface responseIFC {
  (response: Response, type: string, result: object | any, message: string, responseCode: number, httpOnlyCookie?: cookieIFC | any): void
}
interface paginationResponseIFC {
  (response: Response, type: string, result: any, message: string, code: number): void
}
interface checkErrorCodeIFC {
  (error: Error): object
}
//
const data: dataIFC = (data: object) => ({ error: null, data })

const paginationData: paginationDataIFC = (data, meta) => ({ error: null, data, meta })

const error: errorIFC = (error) => ({ error, data: null })

const response: responseIFC = (response, type, result, message, responseCode, httpOnlyCookie): void => {
  //
  let status = Boolean(true)
  let data: any = result.data
  let code: number = responseCode
  if (type === 'fail') {
    //
    const errCode: any = checkErrorCode(result.error)
    status = false
    data = result.error.data || ''
    message = result.error.message || message
    code = result.error.code || errCode
    responseCode = errCode
  }
  try {
    //
    const cookiesFound: boolean = httpOnlyCookie?.name && httpOnlyCookie?.value
    if (cookiesFound) response.cookie(httpOnlyCookie?.name, httpOnlyCookie?.value, cookieConfig)
  } catch (e: any) {
    //
    const ctx: string = 'app-service'
    logger.log(ctx, e.message, 'error')
  }
  response.status(responseCode).json({ success: status, data, message, code })
}

const paginationResponse: paginationResponseIFC = (response, type, result, message, code): void => {
  //
  let status = true
  let data = result.data
  if (type === 'fail') {
    //
    status = false
    data = ''
    message = result.error
  }
  response.status(code).json({ success: status, data, meta: result.meta, code, message })
}

const checkErrorCode: checkErrorCodeIFC = (error): object => {
  //
  switch (error.constructor) {
    case BadRequestError:
      return httpError.BAD_REQUEST
    case ConflictError:
      return httpError.CONFLICT
    case ExpectationFailedError:
      return httpError.EXPECTATION_FAILED
    case ForbiddenError:
      return httpError.FORBIDDEN
    case GatewayTimeoutError:
      return httpError.GATEWAY_TIMEOUT
    case InternalServerError:
      return httpError.INTERNAL_ERROR
    case NotFoundError:
      return httpError.NOT_FOUND
    case ServiceUnavailableError:
      return httpError.SERVICE_UNAVAILABLE
    case UnauthorizedError:
      return httpError.UNAUTHORIZED
    default:
      return httpError.CONFLICT
  }
}

export { data, paginationData, error, response, paginationResponse }
