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

import { resultIFC } from './wrapper.interface'
import { Request, Response, NextFunction } from 'express'

/**
 *  !-- PROCEDURE ATTRIBUTES (interface)
 *
 * @desc defines all procedure attributes and their data types.
 */
interface procedureIFC {
  //
  (request: Request, response: Response, next: NextFunction): Promise<resultIFC | void> | void
}

/**
 *  !-- FUNCTION ATTRIBUTES (interface)
 *
 * @desc defines all function attributes and their data types.
 */
interface functionIFC {
  //
  (payload: any): any
}

export { procedureIFC, functionIFC }
