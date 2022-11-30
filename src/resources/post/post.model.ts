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

import { Schema, model } from 'mongoose';

import PostInterface from '@/resources/post/post.interface';

/**
 *  !-- POST MODEL (Schema)
 *
 * @desc post database schema.
 */
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

export default model<PostInterface>('Post', PostSchema);
