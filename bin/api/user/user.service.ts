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

import UserModel from '@/api/user/user.model'
import * as wrapper from '@/utils/wrapper'
import tokenFactory from '@/utils/tokenFactory'

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
    public async register(payload: object): Promise<void> {
        //
        try {
            //
            const user = await this.UserModel.create(payload)
            const accessToken = tokenFactory.create(user)
            return wrapper.data(user)
        } catch (e: any) {
            //
            return wrapper.error({ message: e.message })
        }
    }

    /**
     *  !-- USER LOGIN (Method)
     *
     * @desc this is how the user login.
     * @return promise string | error
     */
    public async login(email: string, password: string): Promise<string | Error> {
        //
        try {
            //
            const user = await this.UserModel.findOne({ email })
            if (!user) {
                //
                throw new Error('Unable to find user with that email address')
            }

            if (await user.isValidPassword(password)) {
                //
                return tokenFactory.create(user)
            } else {
                //
                throw new Error('Wrong credentials given')
            }
        } catch (e: any) {
            //
            throw new Error('Unable to login user')
        }
    }
}

export default UserService
