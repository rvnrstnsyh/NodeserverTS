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

import { cleanEnv, str, port } from 'envalid';

/**
 *  !-- ENV VALIDATION (Any)
 *
 * @desc validates the data type and contents of
 * all environment variables.
 */
function validateEnv(): void {
    //
    cleanEnv(process.env, {
        NODE_ENV: str({ choices: ['dev', 'prod'] }),
        PORT: port({ default: 3000 }),
        MONGODB_URI: str(),
    });
}

export default validateEnv;