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
import UserInterface from '@api/user/user.interface'

import { Schema, model } from 'mongoose'

/**
 *  !-- USER MODEL (schema)
 *
 * @desc user database schema.
 */
const UserSchema: Schema = new Schema(
    {
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
        role: {
            type: String,
            required: true,
            default: 'user',
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
UserSchema.pre<UserInterface>('save', function (next) {
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
UserSchema.methods.isValidPassword = async function (password: string): Promise<Error | boolean> {
    //
    return Aes256.decrypt(this.password) === password
}

export default model<UserInterface>('User', UserSchema)
