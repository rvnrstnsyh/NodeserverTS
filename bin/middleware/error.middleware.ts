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

import HttpException from '@helpers/exception/http.exception'

import { Request, Response, NextFunction } from 'express'

/**
 *  !-- ERROR MIDDLEWARE (Function)
 *
 * @desc catches errors and gives http status code
 * based on http exception.
 * @return void
 */
function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction): void {
    //
    const status: number = error.status || 500
    const message: string = error.message || 'Something went wrong'

    response.status(status).send({ status, message })
}

export default errorMiddleware
