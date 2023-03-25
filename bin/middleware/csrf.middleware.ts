/*
|-------------------------------------------------------------------------------
| Nodeserver Copyright © 2021 rvnrstnsyh All Rights Reserved
|-------------------------------------------------------------------------------
|
| Author    : Rivane Rasetiansyah <re@rvnrstnsyh.dev> (https://rvnrstnsyh.dev)
| GitHub    : https://github.com/rvnrstnsyh
| GitLab    : https://gitlab.com/rvnrstnsyh
|
*/

import csrf from 'csurf'

const cookieConfig: object = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: 'strict',
  secure: false,
}


const csrfProtection = csrf({ cookie: cookieConfig })

export default csrfProtection
