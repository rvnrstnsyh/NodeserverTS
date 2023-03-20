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

import * as tokenFactory from '@helpers/utils/tokenFactory'

import UserModel from '@api/user/user.model'

import jwt from 'jsonwebtoken'

import { UnauthorizedError } from '@helpers/errors'
import { Request, Response, NextFunction } from 'express'
import { tokenIFC } from '@helpers/interfaces/token.interface'

/**
 *  !-- AUTHENTICATION CONTROLLER (procedure)
 *
 * @desc authenticate and verify any bearer tokens sent
 * via request headers.
 * @return promise http response | void
 */
async function authenticateMiddleware(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    //
    const payload: Array<string> = []
    try {
        //
        payload[0] = request.headers.authorization!.split('Bearer ')[1].trim()
    } catch (e: any) {
        //
        payload[0] = request.cookies['x-authorization']
    }

    try {
        //
        const result: tokenIFC | jwt.JsonWebTokenError = await tokenFactory.verify(payload[0])

        if (result instanceof jwt.JsonWebTokenError) {
            //
            return response.status(401).json(new UnauthorizedError('Unauthorized'))
        }

        const user: any = await UserModel.findById(result._id).select('-password').exec()

        if (!user) {
            //
            return response.status(401).json(new UnauthorizedError('Unauthorized'))
        }

        request.user = user
        return next()
    } catch (e: any) {
        //
        return response.status(401).json(new UnauthorizedError('Unauthorized'))
    }
}

export default authenticateMiddleware
