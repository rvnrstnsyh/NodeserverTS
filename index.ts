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
import UserController from '@controllers/api/user/user.controller'

validateEnv()

/**
 *  !-- APP (Express)
 *
 * @desc defines each express application.
 */
const apiEndpoints: Array<any> = [new UserController()]
const App: Express = new Express(apiEndpoints, String(process.env.APP_HOST), Number(process.env.APP_PORT))

App.listen()
