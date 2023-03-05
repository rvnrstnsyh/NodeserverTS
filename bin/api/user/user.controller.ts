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
import * as wrapper from '@helpers/utils/wrapper'
import * as validator from '@helpers/utils/validator'

import UserService from '@api/user/user.service'
import userValidation from '@api/user/user.validation'
import ControllerInterface from '@helpers/interfaces/controller.interface'
import authenticatedMiddleware from '@middleware/authenticated.middleware'

import { passportAPI } from '@middleware/passport.middleware'
import { cookieIFC } from '@helpers/interfaces/cookie.interface'
import { Router, Request, Response, NextFunction } from 'express'
import { SUCCESS as httpSuccess, ERROR as httpError } from '@helpers/errors/status_code'
//
interface postRequestIFC {
    (result: object | any): Promise<object>
}
interface sendResponseIFC {
    (service: object | any): Promise<void>
}
/**
 *  !-- USER CONTROLLER (class)
 *
 * @desc user service  endpoint.
 * authentication, authorization, verification and validation.
 */
class UserController implements ControllerInterface {
    //
    public path: string = '/user/v1'
    public router: Router = Router()

    private UserService: UserService = new UserService()

    constructor() {
        //
        this.endpoints()
    }

    /**
     *  !-- USER ENDPOINT (method)
     *
     * @desc defines endpoints, middleware, and controller paths.
     * @return void
     */
    private endpoints(): void {
        //
        this.router.post(`${this.path}/register`, [passportAPI], this.register)
        this.router.post(`${this.path}/login`, [passportAPI], this.login)
        this.router.get(`${this.path}/verify`, [passportAPI, authenticatedMiddleware], this.verifyUser)
    }

    /**
     *  !-- USER CONTROLLER - REGISTER (method)
     *
     * @desc register handler.
     * @return promise http response | void
     */
    private register = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
        //
        const payload: object | any = request.body
        const validatePayload: any = validator.isValidPayload(payload, userValidation.register)
        const postRequest: postRequestIFC = async (result: any): Promise<any> => {
            //
            if (result.error) return result
            return await this.UserService.register(payload)
        }
        const sendResponse: sendResponseIFC = async (register: object | any): Promise<void> => {
            //
            const service: object | any = await register
            if (service.error) {
                //
                logger.info('user-register', `${payload.email} Failed to register`, 'error', 'nodeserverts')
                return wrapper.response(response, 'fail', service, service.error.message, httpError.CONFLICT)
            }
            logger.info('user-register', `${payload.email} Successfully registered`, 'info', 'nodeserverts')
            return wrapper.response(response, 'success', service, 'Register User', httpSuccess.OK)
        }
        sendResponse(postRequest(validatePayload))
    }

    /**
     *  !-- USER CONTROLLER - LOGIN (method)
     *
     * @desc login handler.
     * @return promise http response | void
     */
    private login = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
        //
        const payload: object | any = request.body
        const validatePayload: any = validator.isValidPayload(payload, userValidation.login)
        const postRequest: postRequestIFC = async (result: any): Promise<any> => {
            //
            if (result.error) return result
            return await this.UserService.login(payload)
        }
        const sendResponse: sendResponseIFC = async (login: any): Promise<void> => {
            //
            const service: object | any = await login
            if (service.error) {
                //
                logger.info('user-login', `${payload.email} Failed to login`, 'error', 'nodeserverts')
                return wrapper.response(response, 'fail', service, service.error.message, httpError.NOT_FOUND)
            }
            logger.info('user-login', `${payload.email} Successfully login`, 'info', 'nodeserverts')
            const httpOnlyCookie: cookieIFC = {
                name: 'x-authorization',
                value: service.data.token
            }
            return wrapper.response(response, 'success', wrapper.data(service.data.message), 'Login User', httpSuccess.OK, httpOnlyCookie)
        }
        sendResponse(postRequest(validatePayload))
    }

    /**
     *  !-- USER CONTROLLER - VERIFY USER (method)
     *
     * @desc verify handler.
     * @return http response | void
     */
    private verifyUser = (request: Request, response: Response, next: NextFunction): Response | void => {
        //
        return wrapper.response(response, 'success', wrapper.data(request.user!), 'Verify User', httpSuccess.OK)
    }
}

export default UserController
