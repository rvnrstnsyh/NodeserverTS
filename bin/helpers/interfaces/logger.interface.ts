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

/**
 *  !-- LOGGER ATTRIBUTES (interface)
 *
 * @desc defines all logger attributes and their data types.
 */
interface logIFC {
  (context: string, message: string, scope: string): void
}
interface infoIFC {
  (context: string, message: string, scope: string, meta?: string): void
}
interface errorIFC {
  (context: string, message: string, scope: string, meta?: string): void
}

export { logIFC, infoIFC, errorIFC }
