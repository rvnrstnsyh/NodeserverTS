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

import * as config from '@helpers/infra/configs/global.config'

import passport from 'passport'

import { BasicStrategy } from 'passport-http'

class Auth {
  //
  private username: string
  private password: string

  constructor(username: string, password: string) {
    //
    this.username = username
    this.password = password
  }

  public isValidPassword(password: string) {
    //
    return this.password === password
  }
}

function findByUsername(username: string, callback: any): object | any {
  //
  const authentication: object | any = config.get('/authentication')
  const data: object | any = authentication.map((value: object | any): object | string => {
    //
    if (value.username === username) return value
    return ''
  })
  const user: Auth = new Auth(data[0].username, data[0].password)
  callback(user)
}


passport.use(new BasicStrategy((username: string, password: string, callback: any): void => {
  //
  findByUsername(username, (data: Auth) => {
    //
    if (!data) return callback(null, false)
    if (!data.isValidPassword(password)) return callback(null, false)
    return callback(null, data)
  })
}))

const passportAPI: any = passport.authenticate('basic', { session: false })
const init: any = () => passport.initialize()

export { passportAPI, init }
