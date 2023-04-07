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

import { cleanEnv, host, port, str, num, bool, url } from 'envalid'

/**
 *  !-- ENV VALIDATION (procedure)
 *
 * @desc validates the data type and contents of all environment variables.
 * @return void
 */
function validateEnv(): void {
    //
    cleanEnv(process.env, {
        // ? +--------------------------------------------------------------------------+
        // ? | General                                                                  |
        // ? +--------------------------------------------------------------------------+
        APP_ENV: str({ choices: ['development', 'production'], default: 'development' }),
        APP_NAME: str({ default: 'nodeserverts-41334707' }),
        APP_HOST: host({ default: '127.0.0.1' }),
        APP_PORT: port({ default: 7952 }),
        APP_SECRET: str(),
        APP_PUBLIC: str(),
        APP_NAMESPACE: str(),
        // ---
        // ? +--------------------------------------------------------------------------+
        // ? | Cookie                                                                   |
        // ? +--------------------------------------------------------------------------+
        COOKIE_SECRET: str(),
        // ---
        // ? +--------------------------------------------------------------------------+
        // ? | Authentication                                                           |
        // ? +--------------------------------------------------------------------------+
        BASIC_AUTH_USERNAME: str(),
        BASIC_AUTH_PASSWORD: str(),
        BASIC_AUTH_HEADER: str(),
        // ---
        // ? +--------------------------------------------------------------------------+
        // ? | Json-web-token                                                           |
        // ? +--------------------------------------------------------------------------+
        JWT_SECRET: str(),
        JWT_ALGORITHM: str({ default: 'RS256' }),
        JWT_AUDIENCE: str(),
        JWT_ISSUER: str({ default: 'nodeserverts-41334707' }),
        PRIVATE_KEY_PATH: str({ default: 'rs256private.pem' }),
        PUBLIC_KEY_PATH: str({ default: 'rs256public.pem' }),
        // ---
        // ? +--------------------------------------------------------------------------+
        // ? | Database                                                                 |
        // ? +--------------------------------------------------------------------------+
        MONGO_DATABASE_URL: url(),
        MYSQL_DATABASE_NAME: str({ default: 'nodeserverts_db' }),
        MYSQL_USER: str({ default: 'root' }),
        MYSQL_PASSWORD: str({ default: '' }),
        MYSQL_HOST: str({ default: 'localhost' }),
        MYSQL_CONNECTION_LIMIT: num({ default: 100 }),
        // ---
        // ? +--------------------------------------------------------------------------+
        // ? | Mailer                                                                   |
        // ? +--------------------------------------------------------------------------+
        MAIL_HOST: str(),
        MAIL_PORT: port({ default: 465 }),
        MAIL_SECURE: bool({ default: true }),
        MAIL_USER: str(),
        MAIL_PASSWORD: str(),
        // ---
        // ? +--------------------------------------------------------------------------+
        // ? | Cipher                                                                   |
        // ? +--------------------------------------------------------------------------+
        CIPHER_ALGORITHM: str({ default: 'aes-256-gcm' }),
        CIPHER_IV_LENGTH: num({ default: 16 }),
        CIPHER_GCM_KEY: str(),
        CIPHER_CBC_KEY: str(),
        // ---
        // ? +--------------------------------------------------------------------------+
        // ? | Infura                                                                   |
        // ? +--------------------------------------------------------------------------+
        INFURA_PROJECT_ID: str({ default: '' }),
        INFURA_SECRET_KEY: str({ default: '' })
    })
}

export default validateEnv
