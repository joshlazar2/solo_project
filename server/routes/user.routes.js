const { authenticate } = require('../config/jwt.config');
const UserController = require('../controllers/user.controller')


module.exports = app => {
    app.post('/api/register', UserController.registerUser);
    app.post('/api/login', UserController.loginUser);
    app.post('/api/logout', UserController.logoutUser);
    app.post('/api/follow/:id', UserController.followUser);
    app.post('/api/unfollow/:id', UserController.unfollowUser);
    app.get('/api/myFollowers', UserController.grabMyFollowers);
    app.get('/api/myFollowing', UserController.grabMyFollowing);
    app.get('/api/findUser/:user_id', UserController.findUser);
    app.get('/api/followers/:user_id', UserController.grabFollowers);
    app.get('/api/following/:user_id', UserController.grabFollowing);
    app.get('/api/searchUser/:firstName/:lastName', UserController.searchUser);
    app.get('/api/loggedInUser', UserController.findLoggedInUser);
}