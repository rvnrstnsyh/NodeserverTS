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

import { Router } from 'express'

/**
 *  !-- CONTROLLER ATTRIBUTES (interface)
 *
 * @desc defines all controller attributes and their data types.
 */
export default interface Controller {
    //
    path: string
    router: Router
}
