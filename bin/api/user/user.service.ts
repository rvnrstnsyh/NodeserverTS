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

import * as wrapper from '@helpers/utils/wrapper'
import { ConflictError } from '@helpers/errors'

import UserModel from '@api/user/user.model'
import tokenFactory from '@helpers/utils/tokenFactory'

/**
 *  !-- USER SERVICE (Class)
 *
 * @desc user controller advanced logic.
 */
class UserService {
    //
    private UserModel = UserModel

    /**
     *  !-- USER REGISTER (Method)
     *
     * @desc register a new user.
     * @return promise string | error
     */
    public async register(payload: object): Promise<object> {
        //
        try {
            //
            const user = await this.UserModel.create(payload)
            const accessToken = tokenFactory.create(user)
            return wrapper.data(user)
        } catch (e: any) {
            //
            return wrapper.error(new ConflictError(e.message))
        }
    }

    /**
     *  !-- USER LOGIN (Method)
     *
     * @desc this is how the user login.
     * @return promise string | error
     */
    public async login(payload: object | any): Promise<object> {
        //
        try {
            //
            const user = await this.UserModel.findOne({ email: payload.email })
            if (!user) return wrapper.error({ message: 'Unable to find user with that email address' })
            if (await user.isValidPassword(payload.password)) return wrapper.data({ message: 'Login success', token: tokenFactory.create(user) })

            return wrapper.error({ message: 'Wrong credentials given' })
        } catch (e: any) {
            //
            return wrapper.error({ message: 'Unable to login user' })
        }
    }
}

export default UserService
