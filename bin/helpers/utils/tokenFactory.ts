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
import UserInterface from '@api/user/user.interface'
import TokenInterface from '@helpers/interfaces/token.interface'

/**
 *  !-- TOKEN CREATE (Method)
 *
 * @desc create a new token.
 * @return string
 */
const create = (user: UserInterface): string => {
    //
    return Aes256.encrypt(jwt.sign({ _id: user._id }, process.env.JWT_SECRET as jwt.Secret, { expiresIn: '1d' }))
}

/**
 *  !-- TOKEN VERIFY (Method)
 *
 * @desc verify token
 * @return promise jwt error | token interface
 */
const verify = async (bearer: string): Promise<jwt.VerifyErrors | TokenInterface> => {
    //
    return new Promise((resolve, reject): void => {
        //
        jwt.verify(Aes256.decrypt(bearer), process.env.JWT_SECRET as jwt.Secret, (error, payload): void => {
            if (error) return reject(error)
            resolve(payload as TokenInterface)
        })
    })
}

export { create, verify }
