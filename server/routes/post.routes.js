const PostController = require('../controllers/post.controller')
const {authenticate} = require('../config/jwt.config')


module.exports = app => {
    app.post('/api/createPost', authenticate, PostController.createPost);
    app.get('/api/allPostsByLoggedInUser', authenticate, PostController.allPostsByLoggedInUser);
    app.delete('/api/deletePost/:id', authenticate, PostController.deletePost);
    app.put('/api/updatePost/:id', authenticate, PostController.updatePost);
    app.get('/api/findPost/:id', PostController.findOnePost);
    app.get('/api/feedPosts', authenticate, PostController.getFeedPosts);
    app.get('/api/userPosts/:user_id', PostController.postsByUserId);
}