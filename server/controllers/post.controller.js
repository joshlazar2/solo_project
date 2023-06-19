const Post = require('../models/post.model');
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");


module.exports = {
    findAllPosts: async (req, res) => {
        try {
            const allPosts = await Post.find(); // allPosts is the result of whatever is returned from the find query
            res.status(200).json(allPosts)
        }
        catch (err) {
            res.status(400).json(err)
        }
    },

    createPost: async (req, res) => {
        try {
            console.log('REQ BODY', req.body)
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true })
            console.log('Decoded JWT', decodedJwt);
            const post = { ...req.body, user_id: decodedJwt.payload._id }
            console.log('Finalized Post', post)
            const newPost = await Post.create(post);
            res.status(200).json(newPost)
        }
        catch (err) {
            res.status(400).json(err)
        }
    },

    allPostsByLoggedInUser: async (req, res) => {
        try {
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true })
            console.log('Decoded JWT', decodedJwt);
            const user_id = decodedJwt.payload._id
            const posts = await Post.find({ user_id: user_id })
            res.status(200).json(posts)
        }
        catch (err) {
            res.status(400).json(err)
        }
    },

    deletePost: async (req, res) => {
        try {
            const result = await Post.deleteOne({ _id: req.params.id })
            res.status(200).json(result)
        }
        catch (err) {
            res.status(400).json(err)
        }
    },

    updatePost: async (req, res) => {
        try {
            console.log('Req yo', req.body);
            const updatedPost = await Post.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true, runValidators: true }
            )
            res.status(200).json(updatedPost)
        }
        catch (err) {
            res.status(400).json(err)
        }
    },

    findOnePost: async (req, res) => {
        try {
            const onePost = await Post.findOne({ _id: req.params.id })
            res.status(200).json(onePost)
        }
        catch (err) {
            res.status(400).json(err)
        }
    },

    getFeedPosts: async (req, res) => {
        try {
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true });
            console.log('decodedJWT', decodedJwt);
            const loggedInUserId = decodedJwt.payload._id;

            // Find the logged-in user to get the list of users they are following
            const loggedInUser = await User.findById(loggedInUserId);
            
            // Get the list of users the logged-in user follows
            const followedUserIds = loggedInUser.following;

            // Find posts created by the users the logged-in user follows
            const feedPosts = await Post.find({ user_id: { $in: followedUserIds } })
                .sort({ createdAt: -1 }); // Sort posts by creation date in descending order

            const feedData = []

            for (const post of feedPosts) {
                const user = await User.findById(post.user_id);
                const creator = `${user.firstName} ${user.lastName}`;
                const feedPostData = {
                    _id: post._id,
                    creator: creator,
                    content: post.content,
                    createdAt: post.createdAt,
                    user_id: post.user_id
                };
                feedData.push(feedPostData);
            }

            res.status(200).json(feedData);
            
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    postsByUserId: async (req, res) => {
        try{
            const posts = await Post.find({ user_id: req.params.user_id })
            res.status(200).json(posts)
        }
        catch(err){
            res.status(400).json(err)
        }
    }
}