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
 *  !-- POST ATTRIBUTES (Interface)
 *
 * @desc Defines all post attributes and their data types
 */
export default interface Post extends Document {
    //
    title: string
    body: string
}
