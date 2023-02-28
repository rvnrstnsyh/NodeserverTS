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

import * as logger from '@/utils/logger'
import * as wrapper from '@/utils/wrapper'

import ErrorMiddleware from '@/middleware/error.middleware'
import ControllerInterface from '@/utils/interfaces/controller.interface'

import cors from 'cors'
import PATH from 'path'
import helmet from 'helmet'
import mongoose from 'mongoose'
import flash from 'connect-flash'
import session from 'express-session'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import useragent from 'express-useragent'

import { rateLimit } from 'express-rate-limit'
import { SUCCESS as httpSuccess } from '@/utils/errors/status_code'
import express, { Request, Response, NextFunction, Application } from 'express'

class App {
    //
    public express: Application
    public HOST: string
    public PORT: number

    private URI: string
    private CORS: RegExp
    private CONF: object

    constructor(controllers: ControllerInterface[], HOST: string, PORT: number) {
        //
        this.express = express()
        this.HOST = HOST || 'localhost'
        this.PORT = PORT || 3000
        this.URI = `http://${HOST}:${PORT}`
        this.CORS = /^.+localhost(3000|8080|8000)$/
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
        this.init_error_handling()
        this.init_default_middleware()
        this.init_request_limiter()
        this.init_controllers(controllers)
    }

    // ! +--------------------------------------------------------------------------+
    // ! | Database connection (Default MongoDB)                                    |
    // ! +--------------------------------------------------------------------------+
    private init_database_connection(): void {
        //
        const MONGODB_URI: any = process.env.MONGODB_URI
        mongoose.set('strictQuery', true).connect(`${MONGODB_URI}`)
    }

    // ! +--------------------------------------------------------------------------+
    // ! | Error Handler                                                            |
    // ! +--------------------------------------------------------------------------+
    private init_error_handling(): void {
        //
        this.express.use(ErrorMiddleware)
    }

    // ! +--------------------------------------------------------------------------+
    // ! | Default Middleware                                                       |
    // ! +--------------------------------------------------------------------------+
    private init_default_middleware(): void {
        //
        this.express
            .use((request: Request, response: Response, next: NextFunction): void => {
                //
                const ctx: string = 'app-access'
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
    private init_controllers(controllers: ControllerInterface[]): void {
        //
        controllers.forEach((controller: ControllerInterface): void => {
            //
            this.express.use('/api', controller.router)
        })

        this.express.use(/.*/, (request: Request, response: Response, next: NextFunction): void => {
            //
            const message: string = 'This service is running properly'
            wrapper.response(response, 'success', wrapper.data(request.useragent?.source), message, httpSuccess.OK)
        })
    }

    // ! +--------------------------------------------------------------------------+
    // ! | Server Listening                                                         |
    // ! +--------------------------------------------------------------------------+
    public listen(): void {
        //
        this.express.listen(this.PORT, (): void => {
            //
            const ctx: string = 'app-listen'
            logger.log(ctx, `NodeserverTS listening on http://127.0.0.1:${this.PORT} ..`, 'info')
        })
    }
}

export default App
