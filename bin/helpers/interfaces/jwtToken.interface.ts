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

import { Request, Response, NextFunction } from 'express'
import { tokenIFC } from '@helpers/interfaces/token.interface'

/**
 *  !-- JWT ATTRIBUTES (interface)
 *
 * @desc defines all jwt attributes and their data types.
 */
interface getKeyIFC {
  (keyPath: string): string
}
interface generateTokenIFC {
  (payload: any, expiresIn?: string): Promise<string>
}
interface getTokenIFC {
  (headers: any): string | undefined
}
interface decodedTokenIFC {
  (token: string): tokenIFC
}
interface verifyTokenIFC {
  (request: Request, response: Response, next: NextFunction): void
}

export { getKeyIFC, generateTokenIFC, getTokenIFC, decodedTokenIFC, verifyTokenIFC }
