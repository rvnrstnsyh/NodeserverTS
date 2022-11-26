import HttpException from '@/utils/exception/http.exception';

import { Request, Response, NextFunction } from 'express';

function errorMiddleware(
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
): void {
    //
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    response.status(status).send({ status, message });
}

export default errorMiddleware;
