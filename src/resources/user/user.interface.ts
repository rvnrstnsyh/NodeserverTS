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

import { Document } from 'mongoose';

/**
 *  !-- USER ATTRIBUTES (Interface)
 *
 * @desc defines all user attributes and their data types.
 */
export default interface User extends Document {
    //
    username: string;
    email: string;
    password: string;
    role: string;
    isValidPassword(password: string): Promise<Error | boolean>;
}
