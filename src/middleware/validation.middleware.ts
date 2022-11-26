import Joi from 'joi';

import { Request, Response, NextFunction, RequestHandler } from 'express';

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<void> => {
        //
        const options: Object = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        try {
            //
            const value: Object = await schema.validateAsync(
                request.body,
                options
            );
            request.body = value;

            next();
        } catch (e: any) {
            //
            const errors: string[] = [];
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });

            response.status(400).send({ errors: errors });
        }
    };
}

export default validationMiddleware;
