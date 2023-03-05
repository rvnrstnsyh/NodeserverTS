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

import { Schema } from 'mongoose'

/**
 *  !-- TOKEN ATTRIBUTES (interface)
 *
 * @desc defines all token attributes and their data types.
 */
export default interface Token extends Object {
    _id: Schema.Types.ObjectId
    expiresIn: number
}
