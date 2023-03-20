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
import * as tokenFactory from '@helpers/utils/tokenFactory'

import UserModel from '@api/user/user.model'
import userIFC from '@api/user/user.interface'
import verifyEmail from '@helpers/mail/templates/verify_email/render'

import { v5 as uuidv5 } from 'uuid'
import { resultIFC } from '@helpers/interfaces/wrapper.interface'
import { ConflictError, NotFoundError, InternalServerError } from '@helpers/errors'
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
     *  !-- USER LOGIN (function)
     *
     * @desc this is how the user login.
     * @return promise string | error
     */
    public async login(payload: object | any): Promise<object> {
        //
        try {
            //
            const user: userIFC | null = await this.UserModel.findOne({ email: payload.email })
            if (!user) return wrapper.error(new NotFoundError('Unable to find user with that email address'))
            if (await user.isValidPassword(payload.password)) return wrapper.data({ message: 'Login success', token: tokenFactory.create(user) })

            return wrapper.error(new ConflictError('Wrong credentials given'))
        } catch (e: any) {
            //
            return wrapper.error(new ConflictError('Unable to login user'))
        }
    }
}

export default UserService
