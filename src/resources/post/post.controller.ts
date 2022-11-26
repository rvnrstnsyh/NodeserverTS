import PostService from '@/resources/post/post.service';
import postValidation from '@/resources/post/post.validation';
import HttpException from '@/utils/exception/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';

import { Router, Request, Response, NextFunction } from 'express';

class PostController implements Controller {
    //
    public path: string = '/post';
    public router: Router = Router();
    private PostService: PostService = new PostService();

    constructor() {
        //
        this.endpoint();
    }

    private endpoint(): void {
        //
        this.router.post(
            `${this.path}`,
            validationMiddleware(postValidation.create),
            this.execute
        );
    }

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
