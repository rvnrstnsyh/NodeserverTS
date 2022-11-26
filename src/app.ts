import 'module-alias/register';

import ErrorMiddleware from '@/middleware/error.middleware';
import Controller from '@/utils/interfaces/controller.interface';

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';

import express, { Application } from 'express';

class App {
    //
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        //
        this.express = express();
        this.port = port;

        this.init_DatabaseConnection();
        this.init_ErrorHandling();
        this.init_GlobalMiddleware();
        this.init_Controllers(controllers);
    }

    private init_GlobalMiddleware(): void {
        //
        this.express
            .use(helmet())
            .use(cors())
            .use(morgan('dev'))
            .use(express.json())
            .use(express.urlencoded({ extended: true }))
            .use(compression());
    }

    private init_Controllers(controllers: Controller[]): void {
        //
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private init_ErrorHandling(): void {
        //
        this.express.use(ErrorMiddleware);
    }

    private init_DatabaseConnection(): void {
        //
        const MONGODB_URI: any = process.env.MONGODB_URI;

        mongoose.connect(`${MONGODB_URI}`);
    }

    public listen(): void {
        //
        this.express.listen(this.port, (): void => {
            //
            console.log(`nodeserverts listening on port ${this.port}`);
        });
    }
}

export default App;
