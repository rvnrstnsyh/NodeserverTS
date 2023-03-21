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

import { Document } from 'mongoose'

/**
 *  !-- USER ATTRIBUTES (interface)
 *
 * @desc defines all user attributes and their data types.
 */
interface UserIFC extends Document {
    //
    userId: string
    username: string
    email: string
    password: string
    is_active: boolean
    createdAt: Date
    updatedAt: Date
    isValidPassword(password: string): boolean
}

export default UserIFC
