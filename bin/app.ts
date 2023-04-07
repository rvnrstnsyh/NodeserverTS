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

import * as logger from '@helpers/utils/logger'
import * as wrapper from '@helpers/utils/wrapper'

import ControllerIFC from '@helpers/interfaces/controller.interface'

import cors from 'cors'
import PATH from 'path'
import helmet from 'helmet'
import mongoose from 'mongoose'
import flash from 'connect-flash'
import session from 'express-session'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import useragent from 'express-useragent'

import { JSONRPCServer } from 'json-rpc-2.0'
import { rateLimit } from 'express-rate-limit'
import { passportAPI } from '@middlewares/passport.middleware'
import { SUCCESS as httpSuccess } from '@helpers/errors/status_code'
import express, { Request, Response, NextFunction, Application } from 'express'

class App {
    //
    public express: Application
    public rpc: JSONRPCServer
    public HOST: string
    public PORT: number

    private URI: string
    private CORS: RegExp
    private CONF: object

    constructor(controllers: ControllerIFC[], HOST: string, PORT: number) {
        //
        this.express = express()
        this.rpc = new JSONRPCServer();
        this.HOST = HOST || 'localhost'
        this.PORT = PORT || 7952
        this.URI = `http://${HOST}:${PORT}`
        this.CORS = /^.+localhost(7952|3000|8080)$/
        this.CONF = {
            maxAge: 5,
            origin: this.CORS || ['*'],
            // ? ['*'] -> to expose all header, any type header will be allow to access
            // ? X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
            allowedHeaders: ['Authorization'],
            exposedHeaders: ['Authorization'],
            optionsSuccesStatus: 200,
        }
        this.init_database_connection()
        this.init_default_middleware()
        this.init_request_limiter()
        this.init_controllers(controllers)
    }

    // ! +--------------------------------------------------------------------------+
    // ! | Database connection (Default MongoDB)                                    |
    // ! +--------------------------------------------------------------------------+
    private init_database_connection(): void {
        //
        const ctx: string = 'connection:database'
        const options: object = {
            maxPoolSize: 100,
            socketTimeoutMS: 15000,
            wtimeoutMS: 15000,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        try {
            //
            mongoose.set('strictQuery', true).connect(`${process.env.MONGO_DATABASE_URL}`, options)
            logger.log(ctx, 'MongoDB connected', 'info')
        } catch (error: any) {
            //
            logger.log(ctx, error.message, 'error')
        }
    }

    // ! +--------------------------------------------------------------------------+
    // ! | Default Middleware                                                       |
    // ! +--------------------------------------------------------------------------+
    private init_default_middleware(): void {
        //
        this.express
            .use((request: Request, response: Response, next: NextFunction): void => {
                //
                const ctx: string = 'app:access'
                logger.log(ctx, `${request.method} ${this.URI}${request.url}`, 'info')
                next()
            })
            .use(helmet({ contentSecurityPolicy: false }))
            .use(cors(this.CONF))
            .use(cookieParser(`${process.env.COOKIE_SECRET}`))
            .use(session({
                cookie: {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    sameSite: 'strict',
                    secure: false,
                },
                secret: `${process.env.COOKIE_SECRET}`,
                resave: true,
                saveUninitialized: true,
            }))
            .use(useragent.express())
            .use(flash())
            .use(express.json())
            .use(express.urlencoded({ extended: true }))
            .use(express.static(PATH.join(__dirname + '/bin')))
            .use(compression())
    }

    // ! +--------------------------------------------------------------------------+
    // ! | Default Request Limit, DDOS attack mitigation                            |
    // ! +--------------------------------------------------------------------------+
    private init_request_limiter(): void {
        //
        const limiter: any = rateLimit({
            windowMs: 15 * 60 * 1000,
            // ? 15 minutes
            max: 500,
            // ? Limit each IP to 500 requests per windowMs
            // ? If the request has exceeded the limit, give a message
            message: {
                status: false,
                code: 429,
                message: 'Too many requests, Your IP is temporarily blocked.',
            },
        })
        this.express.use(limiter)
    }

    // ! +--------------------------------------------------------------------------+
    // ! | App Controllers                                                          |
    // ! +--------------------------------------------------------------------------+
    private init_controllers(controllers: ControllerIFC[]): void {
        //
        this.express.post("/", [passportAPI], (request: Request, response: Response): void => {
            // server.receive takes a JSON-RPC request and returns a promise of a JSON-RPC response.
            // It can also receive an array of requests, in which case it may return an array of responses.
            // Alternatively, you can use server.receiveJSON, which takes JSON string as is (in this case request.body).
            this.rpc.receive(request.body).then((data: object | null): void => {
                if (data) {
                    //
                    response.json(data);
                } else {
                    // If response is absent, it was a JSON-RPC notification method.
                    // Respond with no content status (204).
                    response.sendStatus(204);
                }
            });
        });

        controllers.forEach((controller: ControllerIFC): void => {
            //
            controller.router.stack.forEach((fx: any) => {
                //
                this.rpc.addMethod(fx.route.stack[1].name, fx.route.stack[1].handle)
            })
            this.express.use('/api', controller.router)
        })

        this.express.use(/.*/, (request: Request, response: Response, next: NextFunction): void => {
            //
            const message: string = '[NodeserverTS] This service is running properly'
            const agent: string | any = request.useragent?.source
            wrapper.response(response, 'success', wrapper.data(agent), message, httpSuccess.OK)
        })
    }

    // ! +--------------------------------------------------------------------------+
    // ! | Server Listening                                                         |
    // ! +--------------------------------------------------------------------------+
    public listen(): void {
        //
        this.express.listen(this.PORT, (): void => {
            //
            const ctx: string = 'app:listen'
            logger.log(ctx, `NodeserverTS listening on http://127.0.0.1:${this.PORT} ..`, 'info')
        })
    }
}

export default App
