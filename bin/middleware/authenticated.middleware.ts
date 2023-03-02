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

import UserModel from '@api/user/user.model'
import tokenFactory from '@helpers/utils/tokenFactory'
import TokenInterface from '@helpers/interfaces/token.interface'

import jwt from 'jsonwebtoken'

import { UnauthorizedError } from '@helpers/errors'
import { Request, Response, NextFunction } from 'express'

/**
 *  !-- AUTHENTICATION CONTROLLER (Method)
 *
 * @desc authenticate and verify any bearer tokens sent
 * via request headers.
 * @return promise http response | void
 */
async function authenticateMiddleware(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    //
    let bearer: string = request.headers.authorization!
    !bearer ? bearer = request.cookies.authorization : bearer = bearer.split('Bearer ')[1].trim()

    try {
        //
        const payload: TokenInterface | jwt.JsonWebTokenError = await tokenFactory.verify(bearer)

        if (payload instanceof jwt.JsonWebTokenError) {
            //
            return response.status(401).json(new UnauthorizedError('Unauthorized'))
        }

        const user: any = await UserModel.findById(payload._id).select('-password').exec()

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
