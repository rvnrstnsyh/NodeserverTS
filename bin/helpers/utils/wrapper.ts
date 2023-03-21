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

import { ERROR as httpError } from '@helpers/errors/status_code'
import { cookieConfig } from '@helpers/interfaces/cookie.interface'
import {
  dataIFC, paginationDataIFC, errorIFC, responseIFC, paginationResponseIFC,
  checkErrorCodeIFC, resultIFC, PostRequestIFC, SendResponseIFC
} from '@helpers/interfaces/wrapper.interface'
import {
  NotFoundError, InternalServerError, BadRequestError, ConflictError, ExpectationFailedError,
  ForbiddenError, GatewayTimeoutError, ServiceUnavailableError, UnauthorizedError
} from '@helpers/errors'

const data: dataIFC = (data) => ({ error: null, data })

const paginationData: paginationDataIFC = (data, meta) => ({ error: null, data, meta })

const error: errorIFC = (error) => ({ error, data: null })

const response: responseIFC = (response, type, result, message, responseCode, httpOnlyCookie) => {
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
  } catch (error: any) {
    //
    const ctx: string = 'app:service-wrapper'
    logger.log(ctx, error.message, 'error')
  }
  response.status(responseCode).json({ success: status, data, message, code })
}

const paginationResponse: paginationResponseIFC = (response, type, result, message, code) => {
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

const checkErrorCode: checkErrorCodeIFC = (error: Error) => {
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

export { data, paginationData, error, response, paginationResponse, resultIFC, PostRequestIFC, SendResponseIFC }
