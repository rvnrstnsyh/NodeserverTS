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

import userIFC from '@api/user/user.interface'
import UserService from '@api/user/user.service'
import userValidation from '@api/user/user.validation'
import controllerIFC from '@helpers/interfaces/controller.interface'

import { passportAPI } from '@middleware/passport.middleware'
import { cookieIFC } from '@helpers/interfaces/cookie.interface'
import { Router, Request, Response, NextFunction } from 'express'
import { SUCCESS as httpSuccess } from '@helpers/errors/status_code'
import { resultIFC, PostRequestIFC, SendResponseIFC } from '@helpers/interfaces/wrapper.interface'

/**
 *  !-- USER CONTROLLER (class)
 *
 * @desc user service endpoint|controller|handler.
 * authentication, authorization, verification and validation .etc
 */
class UserController implements controllerIFC {
    //
    public path: string = '/user/v1'
    public router: Router = Router()

    private ctx: string = 'user:controller'
    private UserService: UserService = new UserService()

    constructor() {
        //
        this.endpoints()
    }

    /**
     *  !-- USER ENDPOINT (procedure)
     *
     * @desc defines endpoints, middleware, and controller paths.
     * @return void
     */
    private endpoints(): void {
        //
        this.router.post(`${this.path}/register`, [passportAPI], this.register)
        this.router.post(`${this.path}/auth`, [passportAPI], this.auth)
        this.router.post(`${this.path}/auth/refresh`, [passportAPI], this.refresh)
        this.router.post(`${this.path}/verify`, [passportAPI], this.verify)
        this.router.post(`${this.path}/me`, [passportAPI], this.profile)
    }

    /**
     *  !-- USER CONTROLLER - REGISTER (procedure)
     *
     * @desc register handler.
     * @return promise void
     */
    private register = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        //
        const ctx: string = `${this.ctx}-register`
        const payload: userIFC = request.body
        const validatePayload: resultIFC = validator.isValidPayload(payload, userValidation.register)
        const postRequest: PostRequestIFC = async (validate: resultIFC): Promise<resultIFC> => {
            //
            if (validate.error) return validate
            return this.UserService.register(payload)
        }
        const sendResponse: SendResponseIFC = async (register: Promise<resultIFC>): Promise<void> => {
            //
            const service: resultIFC = await register
            if (service.error) {
                //
                logger.info(ctx, `${payload.email} Failed to register [${service.error.message}]`, 'error', 'nodeserverts')
                return wrapper.response(response, 'fail', service, service.error.message, service.error)
            }
            logger.info(ctx, `${payload.email} Successfully registered`, 'info', 'nodeserverts')
            return wrapper.response(response, 'success', service, 'Register User', httpSuccess.CREATED)
        }
        sendResponse(postRequest(validatePayload))
    }

    /**
     *  !-- USER CONTROLLER - AUTH (procedure)
     *
     * @desc auth handler.
     * @return promise void
     */
    private auth = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        //
        const ctx: string = `${this.ctx}-generate-credential`
        const payload: userIFC = request.body
        const validatePayload: resultIFC = validator.isValidPayload(payload, userValidation.generateCredential)
        const postRequest: PostRequestIFC = async (validate: resultIFC): Promise<resultIFC> => {
            //
            if (validate.error) return validate
            return this.UserService.auth(payload)
        }
        const sendResponse: SendResponseIFC = async (auth: Promise<resultIFC>): Promise<void> => {
            //
            const service: resultIFC | any = await auth
            if (service.error) {
                //
                logger.info(ctx, `${payload.email} Failed to auth [${service.error.message}]`, 'error', 'nodeserverts')
                return wrapper.response(response, 'fail', service, service.error.message, service.error)
            }
            logger.info(ctx, `${payload.email} Successfully authenticated`, 'info', 'nodeserverts')
            const httpOnlyCookie: cookieIFC = {
                name: 'x-authorization',
                value: service.data.token
            }
            return wrapper.response(response, 'success', wrapper.data(service.data), 'Auth User', httpSuccess.OK, httpOnlyCookie)
        }
        sendResponse(postRequest(validatePayload))
    }

    /**
     *  !-- USER CONTROLLER - AUTH [REFRESH] (procedure)
     *
     * @desc auth refresh handler.
     * @return promise void
     */
    private refresh = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        //
        const ctx: string = `${this.ctx}-refresh-credential`
        const payload: userIFC = request.body
        const validatePayload: resultIFC = validator.isValidPayload(payload, userValidation.refreshCredential)
        const postRequest: PostRequestIFC = async (validate: resultIFC): Promise<resultIFC> => {
            //
            if (validate.error) return validate
            return this.UserService.refresh(payload)
        }
        const sendResponse: SendResponseIFC = async (refresh: Promise<resultIFC>): Promise<void> => {
            //
            const service: resultIFC | any = await refresh
            if (service.error) {
                //
                logger.info(ctx, `Failed to refresh credential [${service.error.message}]`, 'error', 'nodeserverts')
                return wrapper.response(response, 'fail', service, service.error.message, service.error)
            }
            logger.info(ctx, `${payload.email} Successfully refresh credential`, 'info', 'nodeserverts')
            return wrapper.response(response, 'success', wrapper.data(service.data), 'Auth Refresh User', httpSuccess.OK)
        }
        sendResponse(postRequest(validatePayload))
    }

    /**
     *  !-- USER CONTROLLER - VERIFY USER (procedure)
     *
     * @desc verify handler.
     * @return void
     */
    private verify = (request: Request, response: Response, next: NextFunction): void => {
        //
        const ctx: string = `${this.ctx}-verify`
        const payload: userIFC = request.body
        const validatePayload: resultIFC = validator.isValidPayload(payload, userValidation.verify)
        const postRequest: PostRequestIFC = async (validate: resultIFC): Promise<resultIFC> => {
            //
            if (validate.error) return validate
            return this.UserService.verify(payload)
        }
        const sendResponse: SendResponseIFC = async (verify: Promise<resultIFC>): Promise<void> => {
            //
            const service: resultIFC | any = await verify
            if (service.error) {
                //
                logger.info(ctx, `Failed to verified [${service.error.message}]`, 'error', 'nodeserverts')
                return wrapper.response(response, 'fail', service, service.error.message, service.error)
            }
            logger.info(ctx, `${payload.email} Successfully verified`, 'info', 'nodeserverts')
            return wrapper.response(response, 'success', wrapper.data(service.data), 'Verified User', httpSuccess.OK)
        }
        sendResponse(postRequest(validatePayload))
    }

    /**
     *  !-- USER CONTROLLER - PROFILE (procedure)
     *
     * @desc profile handler.
     * @return void
     */
    private profile = (request: Request, response: Response, next: NextFunction): void => {
        //
        const ctx: string = `${this.ctx}-profile`
        const userId: string = request.body.userId
        const postRequest: any = this.UserService.profile(userId)
        const sendResponse: SendResponseIFC = async (fetch: Promise<resultIFC>): Promise<void> => {
            //
            const service: resultIFC = await fetch
            if (service.error) {
                //
                logger.info(ctx, `userId: ${userId} Failed to get profile [${service.error.message}]`, 'error', 'nodeserverts')
                return wrapper.response(response, 'fail', service, service.error.message, service.error)
            }
            logger.info(ctx, `userId: ${userId} Success`, 'info', 'nodeserverts')
            return wrapper.response(response, 'success', wrapper.data(service.data), 'Profile User', httpSuccess.OK)
        }
        sendResponse(postRequest)
    }
}

export default UserController
