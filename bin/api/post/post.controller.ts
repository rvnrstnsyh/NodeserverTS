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

import PostService from '@/api/post/post.service'
import postValidation from '@/api/post/post.validation'
import HttpException from '@/utils/exception/http.exception'
import validationMiddleware from '@/middleware/validation.middleware'
import ControllerInterface from '@/utils/interfaces/controller.interface'

import { Router, Request, Response, NextFunction } from 'express'

/**
 *  !-- POST CONTROLLER (Class)
 *
 * @desc simple endpoint example.
 */
class PostController implements ControllerInterface {
    //
    public path: string = '/post'
    public router: Router = Router()
    private PostService: PostService = new PostService()

    constructor() {
        //
        this.endpoints()
    }

    /**
     *  !-- POST ENDPOINT (Method)
     *
     * @desc defines endpoints, middleware, and controller paths.
     * @return void
     */
    private endpoints(): void {
        //
        this.router.post(`${this.path}`, validationMiddleware(postValidation.create), this.execute)
    }

    /**
     *  !-- POST CONTROLLER (Method)
     *
     * @desc post endpoint logic.
     * @return promise http response | void
     */
    private execute = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
        //
        try {
            //
            const { title, body }: any = request.body
            const post: Object = await this.PostService.create(title, body)

            response.status(201).json({ post })
        } catch (e: any) {
            //
            next(new HttpException(400, 'Cannot create post'))
        }
    }
}

export default PostController
