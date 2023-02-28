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
 *  !-- POST VALIDATION (Any)
 *
 * @desc validates the data type of all received request bodies.
 */
const create: any = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
})

export default { create }
