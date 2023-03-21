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

import * as mail from '@helpers/mail/nodemailer'
import * as wrapper from '@helpers/utils/wrapper'
import * as jwtAuth from '@helpers/utils/jwtToken'

import UserModel from '@api/user/user.model'
import userIFC from '@api/user/user.interface'
import verifyEmail from '@helpers/mail/templates/verify_email/render'

import { v5 as uuidv5 } from 'uuid'
import { resultIFC } from '@helpers/interfaces/wrapper.interface'
import { tokenIFC } from '@root/helpers/interfaces/token.interface'
import { ConflictError, NotFoundError, ForbiddenError, InternalServerError } from '@helpers/errors'
/**
 *  !-- USER SERVICE (class)
 *
 * @desc user controller advanced logic.
 */
class UserService {
    //
    private UserModel: any = UserModel

    /**
     *  !-- USER REGISTER (function)
     *
     * @desc register a new user.
     * @return promise string | error
     */
    public async register(payload: userIFC): Promise<resultIFC> {
        //
        try {
            //
            const userExist: userIFC | null = await UserModel.findOne({ email: payload.email })
            if (userExist) return wrapper.error(new ConflictError('User already exist'))

            payload.userId = uuidv5(payload.username, `${process.env.APP_NAMESPACE}`)
            payload.email = payload.email.toLowerCase()

            const token: string = await jwtAuth.generateToken({ userId: payload.userId })
            const template: object = await verifyEmail({ ...payload, token })
            const options: object = {
                from: process.env.MAIL_USER,
                to: payload.email,
                subject: 'Verify Your Email',
                html: template
            }
            const sendEmail: boolean = await mail.sendMail(options)

            if (!sendEmail) return wrapper.error(new ConflictError('Failed send email'))
            return wrapper.data(await this.UserModel.create(payload))
        } catch (error: any) {
            //
            return wrapper.error(new InternalServerError(error.message))
        }
    }

    /**
     *  !-- USER AUTH (function)
     *
     * @desc this is how the user auth.
     * @return promise string | error
     */
    public async auth(payload: userIFC): Promise<resultIFC> {
        //
        try {
            //
            const user: userIFC | null = await this.UserModel.findOne({ email: payload.email.toLowerCase() })

            if (!user) return wrapper.error(new NotFoundError('Unable to find user with that email address'))
            if (!user.is_active) return wrapper.error(new ForbiddenError('User is inactive'))
            if (!user.isValidPassword(payload.password)) return wrapper.error(new ConflictError('Wrong credentials given'))

            return wrapper.data(await this.generateToken(user))
        } catch (error: any) {
            //
            return wrapper.error(new InternalServerError(error.message))
        }
    }

    /**
     *  !-- USER VERIFY (function)
     *
     * @desc this is how verify user.
     * @return promise string | error
     */
    public async verify(payload: userIFC): Promise<resultIFC> {
        //
        try {
            //
            const token: string = payload.token
            const decodedToken: tokenIFC = jwtAuth.decodeToken(token)
            const user: userIFC | null = await this.UserModel.findOne({ userId: decodedToken.userId })

            if (!user) return wrapper.error(new NotFoundError('User not found'))
            if (user.is_active) return wrapper.error(new ForbiddenError('User already active'))

            await UserModel.findOneAndUpdate({ userId: decodedToken.userId }, { is_active: true })

            return wrapper.data(null)
        } catch (error: any) {
            //
            return wrapper.error(new InternalServerError(error.message))
        }
    }

    /**
     *  !-- GENERATE TOKEN (function)
     *
     * @desc this is how the user token generation.
     * @return promise object
     */
    private async generateToken(payload: userIFC): Promise<object> {
        //
        try {
            //
            const userId: string = payload.userId
            const token: string = await jwtAuth.generateToken({ userId, authType: 'access' }, '1h')
            const refreshToken: string = await jwtAuth.generateToken({ userId, authType: 'refresh' }, '1d')
            const result: object = {
                token,
                refreshToken,
                expiredIn: 1000 * 60 * 60,
                refreshExpired: 1000 * 60 * 60 * 24,
                profile: {
                    userId,
                    email: payload.email,
                    username: payload.username,
                    is_active: payload.is_active,
                    createdAt: payload.createdAt,
                    updatedAt: payload.updatedAt
                }
            }
            return result
        } catch (error: any) {
            //
            return wrapper.error(new InternalServerError(error.message))
        }
    }
}

export default UserService