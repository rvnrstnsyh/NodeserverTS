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

import jwt from 'jsonwebtoken'

import Aes256 from '@helpers/utils/aes256'
import userIFC from '@api/user/user.interface'

import { tokenIFC } from '@helpers/interfaces/token.interface'

/**
 *  !-- TOKEN CREATE (function)
 *
 * @desc create a new token.
 * @return string
 */
const create = (user: userIFC): string => {
    //
    return Aes256.encrypt(jwt.sign({ _id: user._id }, process.env.JWT_SECRET as jwt.Secret, { expiresIn: '1d' }))
}

/**
 *  !-- TOKEN VERIFY (function)
 *
 * @desc verify token
 * @return promise jwt error | token interface
 */
const verify = async (bearer: string): Promise<jwt.VerifyErrors | tokenIFC> => {
    //
    return new Promise((resolve, reject): void => {
        //
        jwt.verify(Aes256.decrypt(bearer), process.env.JWT_SECRET as jwt.Secret, (error, payload): void => {
            if (error) return reject(error)
            resolve(payload as tokenIFC)
        })
    })
}

export { create, verify }
