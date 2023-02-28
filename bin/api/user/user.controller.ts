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

import * as logger from '@/utils/logger'
import * as wrapper from '@/utils/wrapper'
import * as validator from '@/utils/validator'

import UserService from '@/api/user/user.service'
import userValidation from '@/api/user/user.validation'
import HttpException from '@/utils/exception/http.exception'
import ControllerInterface from '@/utils/interfaces/controller.interface'
import authenticatedMiddleware from '@/middleware/authenticated.middleware'

import { SUCCESS as httpSuccess, ERROR as httpError } from '@/utils/errors/status_code'
import { Router, Request, Response, NextFunction } from 'express'

/**
 *  !-- USER CONTROLLER (Class)
 *
 * @desc simple endpoint example.
 * validation, authentication and authorization.
 */
class UserController implements ControllerInterface {
    //
    public path: string = '/users'
    public router: Router = Router()

    private UserService: UserService = new UserService()

    constructor() {
        //
        this.endpoints()
    }

    /**
     *  !-- USER ENDPOINT (Method)
     *
     * @desc defines endpoints, middleware, and controller paths.
     * @return void
     */
    private endpoints(): void {
        //
        this.router.post(`${this.path}/register`, this.register)
        this.router.post(`${this.path}/login`, this.login)
        this.router.get(`${this.path}`, authenticatedMiddleware, this.verifyUser)
    }

    /**
     *  !-- USER CONTROLLER - REGISTER (Method)
     *
     * @desc post endpoint logic.
     * @return promise http response | void
     */
    private register = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
        //
        const payload: object | any = request.body
        const validatePayload: Function = validator.isValidPayload(payload, userValidation.register)
        const postRequest: Function = async (result: any): Promise<any> => {
            //
            if (result.error) return result
            return await this.UserService.register(payload)
        }
        const sendResponse: Function = async (register: object | any) => {
            //
            const service: object | any = await register
            if (service.error) {
                //
                logger.error('user-register', service.error.message, 'error', 'NodeserverTS')
                return wrapper.response(response, 'fail', service, service.error.message, httpError.CONFLICT)
            }
            logger.info('user-register', `${service.data.email} Successfully registered`, 'info', 'NodeserverTS')
            return wrapper.response(response, 'success', service, 'Register User', httpSuccess.OK)
        }
        sendResponse(postRequest(validatePayload))
    }

    /**
     *  !-- USER CONTROLLER - LOGIN (Method)
     *
     * @desc post endpoint logic.
     * @return promise http response | void
     */
    private login = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
        //
        try {
            //
            const { email, password }: any = request.body
            const token: any = await this.UserService.login(email, password)

            response.status(200).json({ token })
        } catch (e: any) {
            //
            next(new HttpException(400, e.message))
        }
    }

    /**
     *  !-- USER CONTROLLER - VERIFY USER (Method)
     *
     * @desc get endpoint logic.
     * @return http response | void
     */
    private verifyUser = (request: Request, response: Response, next: NextFunction): Response | void => {
        //
        if (!request.user) {
            //
            return next(new HttpException(404, 'No logged in user'))
        }
        response.status(200).json({ verified: request.user })
    }
}

export default UserController
