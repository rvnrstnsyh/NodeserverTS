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
import 'module-alias/register'

import Express from '@root/app'
import validateEnv from '@helpers/utils/validateEnv'
import IndexController from '@root/controller/web/index.controller'
import UserController from '@controller/api/user/user.controller'

validateEnv()

/**
 *  !-- APP (Express)
 *
 * @desc defines each express application.
 */
const apiEndpoints: Array<any> = [new UserController()]
const webEndpoints: Array<any> = [new IndexController()]
const App: Express = new Express(apiEndpoints, webEndpoints, String(process.env.APP_HOST), Number(process.env.APP_PORT))

App.listen()
