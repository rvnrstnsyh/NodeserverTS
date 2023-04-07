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
 *  !-- COOKIE ATTRIBUTES (interface)
 *
 * @desc defines all cookie attributes and their data types.
 */

interface cookieIFC {
  name: string
  value: string
}

const cookieConfig: object = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: 'strict',
  secure: false,
}

export { cookieIFC, cookieConfig }
