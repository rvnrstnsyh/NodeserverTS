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
import CryptoJS from 'crypto-js'
import UserInterface from '@/api/user/user.interface'
import TokenInterface from '@/utils/interfaces/token.interface'

/**
 *  !-- TOKEN CREATE (Method)
 *
 * @desc create a new token.
 * @return string
 */
export const create = (user: UserInterface): string => {
    const token: string = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as jwt.Secret, { expiresIn: '1d' })
    const TripleDES_Token: string = CryptoJS.TripleDES.encrypt(token, `${process.env.APP_SECRET}`).toString()

    return TripleDES_Token
}

/**
 *  !-- TOKEN VERIFY (Method)
 *
 * @desc verify token
 * @return promise jwt error | token interface
 */
export const verify = async (TripleDES_Token: string): Promise<jwt.VerifyErrors | TokenInterface> => {
    return new Promise((resolve, reject): void => {
        const token: string = CryptoJS.TripleDES.decrypt(TripleDES_Token, `${process.env.APP_SECRET}`).toString(CryptoJS.enc.Utf8)

        jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (error, payload): void => {
            if (error) return reject(error)
            resolve(payload as TokenInterface)
        })
    })
}

export default { create, verify }
