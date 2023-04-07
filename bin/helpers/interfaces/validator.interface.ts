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

import { resultIFC } from '@helpers/interfaces/wrapper.interface'

/**
 *  !-- isValidPayloadIFC ATTRIBUTES (interface)
 *
 * @desc defines all isValidPayloadIFC attributes and their data types.
 */
interface isValidPayloadIFC {
  (payload: object, constraint: any): resultIFC
}

export { isValidPayloadIFC }
