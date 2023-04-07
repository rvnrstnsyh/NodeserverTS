/*
|-------------------------------------------------------------------------------
| NodeserverTS Copyright © 2023 rvnrstnsyh All Rights Reserved
|-------------------------------------------------------------------------------
|
| Author    : Rivane Rasetiansyah <re@rvnrstnsyh.dev> (https://rvnrstnsyh.dev)
| GitHub    : https://github.com/rvnrstnsyh
| GitLab    : https://gitlab.com/rvnrstnsyh
|
*/

import { Response } from 'express'
import { cookieIFC } from '@helpers/interfaces/cookie.interface'

/**
 *  !-- WRAPPER ATTRIBUTES (interface)
 *
 * @desc defines all wrapper attributes and their data types.
 */
interface dataIFC {
  (data: object | null): ({ error: null, data: object | null })
}
interface paginationDataIFC {
  (data: object | null, meta: object): ({ error: null, data: object | null, meta: object })
}
interface errorIFC {
  (error: object): ({ error: object, data: null })
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
interface resultIFC {
  error: object | any
  data: object | null
  meta?: object | null
}
interface PostRequestIFC {
  (result: resultIFC): Promise<resultIFC>
}
interface SendResponseIFC {
  (service: Promise<resultIFC>): Promise<void>
}

export { dataIFC, paginationDataIFC, errorIFC, responseIFC, paginationResponseIFC, checkErrorCodeIFC, resultIFC, PostRequestIFC, SendResponseIFC }
