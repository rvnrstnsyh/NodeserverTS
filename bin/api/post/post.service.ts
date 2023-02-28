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

import PostModel from '@/api/post/post.model'
import PostInterface from '@/api/post/post.interface'

/**
 *  !-- POST SERVICE (Class)
 *
 * @desc post controller advanced logic.
 */
class PostService {
    //
    private PostModel: any = PostModel

    /**
     *  !-- POST CREATE (Method)
     *
     * @desc create a new post.
     * @return promise post interface
     */
    public async create(title: string, body: string): Promise<PostInterface> {
        //
        try {
            //
            const newPost: any = await this.PostModel.create({ title, body })
            return newPost
        } catch (e: any) {
            //
            throw new Error('Unable create post')
        }
    }
}

export default PostService
