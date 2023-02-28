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
 *  !-- USER VALIDATION (Any)
 *
 * @desc validates the data type of all received request bodies.
 */
const register: any = Joi.object({
    username: Joi.string().max(25).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

const login: any = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

export default { register, login }
