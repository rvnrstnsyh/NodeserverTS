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
import HttpException from '@helpers/exception/http.exception'
import ControllerInterface from '@helpers/interfaces/controller.interface'
import authenticatedMiddleware from '@middleware/authenticated.middleware'

import { SUCCESS as httpSuccess, ERROR as httpError } from '@helpers/errors/status_code'
import { Router, Request, Response, NextFunction } from 'express'

/**
 *  !-- USER CONTROLLER (Class)
 *
 * @desc simple endpoint example.
 * validation, authentication and authorization.
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
        interface postRequestIfc {
            (result: object | any): Promise<any>
        }
        interface sendResponseIfc {
            (register: object | any): Promise<void>
        }
        //
        const payload: object | any = request.body
        const validatePayload: any = validator.isValidPayload(payload, userValidation.register)
        const postRequest: postRequestIfc = async (result: any): Promise<any> => {
            //
            if (result.error) return result
            return await this.UserService.register(payload)
        }
        const sendResponse: sendResponseIfc = async (register: object | any): Promise<void> => {
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
     *  !-- USER CONTROLLER - LOGIN (Method)
     *
     * @desc post endpoint logic.
     * @return promise http response | void
     */
    private login = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
        //
        interface postRequestIfc {
            (result: object | any): Promise<any>
        }
        interface sendResponseIfc {
            (loogin: object | any): Promise<void>
        }
        //
        const payload: object | any = request.body
        const validatePayload: any = validator.isValidPayload(payload, userValidation.login)
        const postRequest: postRequestIfc = async (result: any): Promise<any> => {
            //
            if (result.error) return result
            return await this.UserService.login(payload)
        }
        const sendResponse: sendResponseIfc = async (login: any): Promise<void> => {
            //
            const service: object | any = await login
            if (service.error) {
                //
                logger.info('user-login', `${payload.email} Failed to login`, 'error', 'nodeserverts')
                return wrapper.response(response, 'fail', service, service.error.message, httpError.CONFLICT)
            }
            logger.info('user-login', `${payload.email} Successfully login`, 'info', 'nodeserverts')
            interface cookie {
                name: string
                value: string
            }
            const cookie: cookie = {
                name: 'authorization',
                value: service.data.token
            }
            return wrapper.response(response, 'success', wrapper.data(service.data.message), 'Login User', httpSuccess.OK, cookie)
        }
        sendResponse(postRequest(validatePayload))
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
        return wrapper.response(response, 'success', wrapper.data(request.user), 'Verify User', httpSuccess.OK)
    }
}

export default UserController
