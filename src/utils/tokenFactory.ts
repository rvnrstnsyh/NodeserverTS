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

import jwt from 'jsonwebtoken';
import UserInterface from '@/resources/user/user.interface';
import TokenInterface from '@/utils/interfaces/token.interface';

/**
 *  !-- TOKEN CREATE (Method)
 *
 * @desc create a new token.
 * @return string
 */
export const create = (user: UserInterface): string => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '1d',
    });
};

/**
 *  !-- TOKEN VERIFY (Method)
 *
 * @desc verify token
 * @return promise jwt error | token interface
 */
export const verify = async (
    token: string
): Promise<jwt.VerifyErrors | TokenInterface> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (error, payload) => {
                if (error) return reject(error);
                resolve(payload as TokenInterface);
            }
        );
    });
};

export default { create, verify };
