import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        default: null,
    },
    likes: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null,
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    likesCount: {
        type: Number,
        default: 0
    }
});
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;