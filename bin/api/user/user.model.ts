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

import Aes256 from '@root/helpers/utils/aes256'
import UserIFC from '@api/user/user.interface'

import { Schema, model } from 'mongoose'

/**
 *  !-- USER MODEL (schema)
 *
 * @desc user database schema.
 */
const UserSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
        },
        is_active: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true, versionKey: false }
)

/**
 *  !-- PASSWORD HASHING (schema method)
 *
 * @desc hash the user's password before entering it into the database.
 * @return next
 */
UserSchema.pre<UserIFC>('save', function (next): void {
    //
    if (!this.isModified('password')) {
        //
        return next()
    }
    this.password = Aes256.encrypt(this.password)
    next()
})

/**
 *  !-- PASSWORD VERIFY (schema method)
 *
 * @desc verify user passwords.
 * @return promise error | boolean
 */
UserSchema.methods.isValidPassword = function (password: string): boolean {
    //
    return Aes256.decrypt(this.password) === password
}

export default model<UserIFC>('User', UserSchema)
