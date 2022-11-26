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

import 'dotenv/config';
import 'module-alias/register';

import Express from './app.js';
import validateEnv from '@/utils/validateEnv';
import PostController from '@/resources/post/post.controller';

validateEnv();

/**
 *  !-- APP (Express)
 *
 * @desc defines each express application.
 */
const App: Express = new Express(
    [new PostController()],
    String(process.env.APP_HOST),
    Number(process.env.APP_PORT)
);

App.listen();
