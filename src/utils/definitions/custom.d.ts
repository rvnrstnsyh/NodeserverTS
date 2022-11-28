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

import User from '@/resources/user/user.interface';

/**
 *  !-- GLOBAL (Any)
 *
 * @desc declare "user" on every request same as user interface.
 */
declare global {
    namespace Express {
        export interface Request {
            user: User;
        }
    }
}
