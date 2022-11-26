import { Schema, model } from 'mongoose';

import Post from '@/resources/post/post.interface';

const PostSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);

export default model<Post>('Post', PostSchema);
