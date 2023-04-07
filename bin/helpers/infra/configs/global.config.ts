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

import 'dotenv/config'
import confidence from 'confidence'

const config: object = {
  app: {
    env: process.env.APP_ENV,
    name: process.env.APP_NAME,
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
    secret: process.env.APP_SECRET,
    public: process.env.APP_PUBLIC,
    namespace: process.env.APP_NAMESPACE
  },
  cookie: {
    secret: process.env.COOKIE_SECRET
  },
  authentication: [
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD,
      header: process.env.BASIC_AUTH_HEADER
    }
  ],
  jwt: {
    secret: process.env.JWT_SECRET
  },
  database: {
    url: process.env.MONGO_DATABASE_URL,
    name: process.env.MYSQL_DATABASE_NAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
  },
  mailer: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  },
  cipher: {
    algorithm: process.env.CIPHER_ALGORITHM,
    ivLength: parseInt(process.env.CIPHER_IV_LENGTH!),
    gcm_key: process.env.CIPHER_GCM_KEY,
    cbc_key: process.env.CIPHER_CBC_KEY
  },
  bearerAuthKey: {
    publicKey: process.env.PUBLIC_KEY_PATH,
    privateKey: process.env.PRIVATE_KEY_PATH,
    verifyOptions: {
      algorithm: process.env.JWT_ALGORITHM,
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER
    }
  },
  infura: {
    project_id: process.env.INFURA_PROJECT_ID,
    secret_key: process.env.INFURA_SECRET_KEY,
  }
}

interface getIFC {
  (key: any): object
}
const store: any = new confidence.Store(config)
const get: getIFC = (key: any) => store.get(key)

export { get }
