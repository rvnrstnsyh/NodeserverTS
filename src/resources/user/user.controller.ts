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

import UserService from '@/resources/user/user.service';
import HttpException from '@/utils/exception/http.exception';
import userValidation from '@/resources/user/user.validation';
import Controller from '@/utils/interfaces/controller.interface';
import authenticated from '@/middleware/authenticated.middleware';
import validationMiddleware from '@/middleware/validation.middleware';

import { Router, Request, Response, NextFunction } from 'express';

/**
 *  !-- USER CONTROLLER (Class)
 *
 * @desc simple endpoint example.
 * validation, authentication and authorization.
 */
class UserController implements Controller {
    //
    public path: string = '/users';
    public router: Router = Router();

    private UserService: UserService = new UserService();

    constructor() {
        //
        this.endpoints();
    }

    /**
     *  !-- USER ENDPOINT (Method)
     *
     * @desc defines endpoints, middleware, and controller paths.
     * @return void
     */
    private endpoints(): void {
        //
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(userValidation.register),
            this.register
        );

        this.router.post(
            `${this.path}/login`,
            validationMiddleware(userValidation.login),
            this.login
        );

        this.router.get(`${this.path}`, authenticated, this.verifyUser);
    }

    /**
     *  !-- USER CONTROLLER - REGISTER (Method)
     *
     * @desc post endpoint logic.
     * @return promise http response | void
     */
    private register = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        //
        try {
            //
            const { username, email, password }: any = request.body;
            const token: any = await this.UserService.register(
                username,
                email,
                password
            );

            response.status(201).json({ token });
        } catch (e: any) {
            //
            next(new HttpException(400, e.message));
        }
    };

    /**
     *  !-- USER CONTROLLER - LOGIN (Method)
     *
     * @desc post endpoint logic.
     * @return promise http response | void
     */
    private login = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        //
        try {
            //
            const { email, password }: any = request.body;
            const token: any = await this.UserService.login(email, password);

            response.status(200).json({ token });
        } catch (e: any) {
            //
            next(new HttpException(400, e.message));
        }
    };

    /**
     *  !-- USER CONTROLLER - VERIFY USER (Method)
     *
     * @desc get endpoint logic.
     * @return http response | void
     */
    private verifyUser = (
        request: Request,
        response: Response,
        next: NextFunction
    ): Response | void => {
        //
        if (!request.user) {
            //
            return next(new HttpException(404, 'No logged in user'));
        }
        response.status(200).json({ verified: request.user });
    };
}

export default UserController;
