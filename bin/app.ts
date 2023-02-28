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

import ErrorMiddleware from '@/middleware/error.middleware';
import ControllerInterface from '@/utils/interfaces/controller.interface';

import fs from 'fs';
import cors from 'cors';
import PATH from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import flash from 'connect-flash';
import session from 'express-session';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import useragent from 'express-useragent';

import { rateLimit } from 'express-rate-limit';
import express, { Request, Response, NextFunction, Application } from 'express';

class App {
    //
    public express: Application;
    public HOST: string;
    public PORT: number;

    private URI: string;
    private CORS: RegExp;
    private CONF: Object;

    constructor(
        controllers: ControllerInterface[],
        HOST: string,
        PORT: number
    ) {
        //
        this.express = express();
        this.HOST = HOST || 'localhost';
        this.PORT = PORT || 3000;
        this.URI = `http://${HOST}:${PORT}`;
        this.CORS = /^.+localhost(3000|8080|8000)$/;
        this.CONF = {
            origin: this.CORS || this.URI,
            optionsSuccesStatus: 200,
        };

        this.init_DatabaseConnection();
        this.init_ErrorHandling();
        this.init_DefaultMiddleware();
        this.init_RequestLimiter();
        this.init_Controllers(controllers);
    }

    // ! +--------------------------------------------------------------------------+
    // ! | Database connection (Default MongoDB)                                    |
    // ! +--------------------------------------------------------------------------+
    private init_DatabaseConnection(): void {
        //
        const MONGODB_URI: any = process.env.MONGODB_URI;
        mongoose.set('strictQuery', true).connect(`${MONGODB_URI}`);
    }

    // ! +--------------------------------------------------------------------------+
    // ! | Error Handler                                                            |
    // ! +--------------------------------------------------------------------------+
    private init_ErrorHandling(): void {
        //
        this.express.use(ErrorMiddleware);
    }

    // ! +--------------------------------------------------------------------------+
    // ! | Default Middleware                                                       |
    // ! +--------------------------------------------------------------------------+
    private init_DefaultMiddleware(): void {
        //
        const accessLogStream = fs.createWriteStream(
            PATH.join(__dirname, 'access.log'),
            { flags: 'a' }
        );
        const accessLogFormat: string = `:remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`;

        this.express
            .use(
                (
                    request: Request,
                    response: Response,
                    next: NextFunction
                ): void => {
                    //
                    console.log(`${request.method} ${this.URI}${request.url}`);
                    next();
                }
            )
            .use(helmet({ contentSecurityPolicy: false }))
            .use(cors(this.CONF))
            .use(cookieParser(`${process.env.COOKIE_SECRET}`))
            .use(
                session({
                    cookie: {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000,
                        sameSite: 'strict',
                        secure: false,
                    },
                    secret: `${process.env.COOKIE_SECRET}`,
                    resave: true,
                    saveUninitialized: true,
                })
            )
            .use(useragent.express())
            .use(flash())
            .use(express.json())
            .use(express.urlencoded({ extended: true }))
            .use(express.static(PATH.join(__dirname + '/private')))
            .use(morgan(accessLogFormat, { stream: accessLogStream }))
            .use(compression());
    }

    // ! +--------------------------------------------------------------------------+
    // ! | Default Request Limit, DDOS attack mitigation                            |
    // ! +--------------------------------------------------------------------------+
    private init_RequestLimiter(): void {
        //
        const limiter: any = rateLimit({
            windowMs: 15 * 60 * 1000, // ? 15 minutes
            max: 500, // ? Limit each IP to 500 requests per windowMs
            // ? If the request has exceeded the limit, give a message
            message: {
                status: false,
                code: 429,
                message: 'Too many requests, Your IP is temporarily blocked.',
            },
        });

        this.express.use(limiter);
    }

    // ! +--------------------------------------------------------------------------+
    // ! | App Controllers                                                          |
    // ! +--------------------------------------------------------------------------+
    private init_Controllers(controllers: ControllerInterface[]): void {
        //
        controllers.forEach((controller: ControllerInterface): void => {
            //
            this.express.use('/api', controller.router);
        });

        this.express.use(/.*/, (request: Request, response: Response): void => {
            //
            response.status(404).json(request.useragent?.source);
        });
    }

    // ! +--------------------------------------------------------------------------+
    // ! | Server Listening                                                         |
    // ! +--------------------------------------------------------------------------+
    public listen(): void {
        //
        this.express.listen(this.PORT, (): void => {
            //
            console.log(`nodeserverts listening on port ${this.PORT}`);
        });
    }
}

export default App;
