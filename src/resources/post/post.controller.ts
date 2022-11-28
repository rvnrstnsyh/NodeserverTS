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

import PostService from '@/resources/post/post.service';
import HttpException from '@/utils/exception/http.exception';
import postValidation from '@/resources/post/post.validation';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';

import { Router, Request, Response, NextFunction } from 'express';

/**
 *  !-- POST CONTROLLER (Class)
 *
 * @desc simple endpoint example.
 */
class PostController implements Controller {
    //
    public path: string = '/post';
    public router: Router = Router();
    private PostService: PostService = new PostService();

    constructor() {
        //
        this.endpoints();
    }

    /**
     *  !-- POST ENDPOINT (Method)
     *
     * @desc defines endpoints, middleware, and controller paths.
     * @return void
     */
    private endpoints(): void {
        //
        this.router.post(
            `${this.path}`,
            validationMiddleware(postValidation.create),
            this.execute
        );
    }

    /**
     *  !-- POST CONTROLLER (Method)
     *
     * @desc post endpoint logic.
     * @return promise http response | void
     */
    private execute = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        //
        try {
            //
            const { title, body }: any = request.body;
            const post: Object = await this.PostService.create(title, body);

            response.status(201).json({ post });
        } catch (e: any) {
            //
            next(new HttpException(400, 'Cannot create post'));
        }
    };
}

export default PostController;
