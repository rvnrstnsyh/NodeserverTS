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

import UserModel from '@/api/user/user.model';
import tokenFactory from '@/utils/tokenFactory';
import HttpException from '@/utils/exception/http.exception';
import TokenInterface from '@/utils/interfaces/token.interface';

import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

/**
 *  !-- AUTHENTICATION CONTROLLER (Method)
 *
 * @desc authenticate and verify any bearer tokens sent
 * via request headers.
 * @return promise http response | void
 */
async function authenticateMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<Response | void> {
    //
    const bearer: any = request.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        //
        return next(new HttpException(401, 'Unauthorized'));
    }

    const accessToken: string = bearer.split('Bearer ')[1].trim();

    try {
        //
        const payload: TokenInterface | jwt.JsonWebTokenError =
            await tokenFactory.verify(accessToken);

        if (payload instanceof jwt.JsonWebTokenError) {
            //
            return next(new HttpException(401, 'Unauthorized'));
        }

        const user: any = await UserModel.findById(payload._id)
            .select('-password')
            .exec();

        if (!user) {
            //
            return next(new HttpException(401, 'Unauthorized'));
        }

        request.user = user;
        return next();
    } catch (e: any) {
        //
        return next(new HttpException(401, 'Unauthorized'));
    }
}

export default authenticateMiddleware;
