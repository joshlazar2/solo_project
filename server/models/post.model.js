const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Content is required"],
        minLength: [3, "Content must be 3 or more characters"],
        maxLength: [500, "Content must not be more than 500 characters"]
    },
    user_id: {
        type: mongoose.Types.ObjectId
    }
}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;