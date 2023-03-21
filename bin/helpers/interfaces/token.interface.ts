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


/**
 *  !-- TOKEN ATTRIBUTES (interface)
 *
 * @desc defines all token attributes and their data types.
 */
interface tokenIFC {
    userId: string,
    authType: string,
    iat: number,
    exp: number,
    aud: string,
    iss: string
}

export { tokenIFC }
