/*
|-------------------------------------------------------------------------------
| NodeserverTS Copyright © 2023 rvnrstnsyh All Rights Reserved
|-------------------------------------------------------------------------------
|
| Author    : Rivane Rasetiansyah <re@rvnrstnsyh.dev> (https://rvnrstnsyh.dev)
| GitHub    : https://github.com/rvnrstnsyh
| GitLab    : https://gitlab.com/rvnrstnsyh
|
*/

import UserInterface from '@/resources/user/user.interface'

/**
 *  !-- GLOBAL (any)
 *
 * @desc declare "user" on every request same as user interface.
 */
declare global {
    namespace Express {
        export interface Request {
            user: UserInterface
        }
    }
}
