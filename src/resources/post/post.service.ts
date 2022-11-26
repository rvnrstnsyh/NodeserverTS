import postModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

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
