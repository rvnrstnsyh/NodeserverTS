import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';

import express, { Application } from 'express';

import ErrorMiddleware from '@/middleware/error.middleware';
import Controller from '@/utils/interfaces/controller.interface';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initialDatabaseConnection();
        this.initialMiddleware();
        this.initialControllers(controllers);
        this.initialErrorHandling();
    }

    private initialMiddleware(): void {
        this.express
            .use(helmet())
            .use(cors())
            .use(morgan('dev'))
            .use(express.json())
            .use(express.urlencoded({ extended: false }))
            .use(compression());
    }

    private initialControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initialErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private initialDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

        mongoose.connect(
            `mongo://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
        );
    }

    public listen(): void {
        this.express.listen(this.port, (): void => {
            console.log(`nodeserverts listening on port ${this.port}`);
        });
    }
}

export default App;
