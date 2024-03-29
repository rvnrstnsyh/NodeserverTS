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

import Joi from 'joi'

/**
 *  !-- USER VALIDATION (object)
 *
 * @desc validates the data type of all received request bodies.
 */
const register: object = Joi.object({
    username: Joi.string().max(25).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

const login: object = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

const generateCredential: object = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const refreshCredential: object = Joi.object({
    refreshToken: Joi.string().required()
})

const verify: object = Joi.object({
    token: Joi.string().required()
})


export default { register, login, generateCredential, refreshCredential, verify }
