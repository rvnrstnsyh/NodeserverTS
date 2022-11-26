import 'dotenv/config';
import 'module-alias/register';

import Express from './app';
import validateEnv from '@/utils/validateEnv';
import PostController from '@/resources/post/post.controller';

validateEnv();

const App: Express = new Express(
    [new PostController()],
    Number(process.env.APP_PORT)
);

App.listen();
