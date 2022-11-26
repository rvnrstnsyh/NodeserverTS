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

import postModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

/**
 *  !-- POST SERVICE (Class)
 *
 * @desc post controller advanced logic.
 */
class PostService {
    //
    private post: any = postModel;

    public async create(title: string, body: string): Promise<Post> {
        //
        try {
            //
            const post: any = await this.post.create({ title, body });
            return post;
        } catch (e: any) {
            //
            throw new Error('Unable create post');
        }
    }
}

export default PostService;
