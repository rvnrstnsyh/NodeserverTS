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

import {
  NotFoundError, InternalServerError, BadRequestError, ConflictError, ExpectationFailedError,
  ForbiddenError, GatewayTimeoutError, ServiceUnavailableError, UnauthorizedError
} from '@/utils/errors'
import { ERROR as httpError } from '@/utils/errors/status_code'
import { Response } from 'express'

const data: Function = (data: object | any) => ({ err: null, data })

const paginationData: Function = (data: object | any, meta: object | any) => ({ err: null, data, meta })

const error: Function = (error: Error) => ({ error, data: null })

const response: Function = (response: Response, type: string, result: any, message = '', responseCode = 200): void => {
  //
  let status: Boolean = true
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
  response.status(responseCode).json({ success: status, data, message, code })
}

const paginationResponse: Function = (response: Response, type: string, result: any, message = '', code = 200): void => {
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

const checkErrorCode: Function = (error: Error): any => {
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