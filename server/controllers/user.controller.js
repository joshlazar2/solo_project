const User = require('../models/user.model');
const secret = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// async/await is an alternstive to .then and .catch
module.exports = {
    registerUser: async (req, res) => {
        try {
            // Check if email entered in the form already exists in the database
            // PotentialUser will be the response/results from the query
            // Whenever we write a database query we will use await and set it up like below
            const potentialUser = await User.findOne({ email: req.body.email })
            if (potentialUser) {
                res.status(400).json({ message: 'That email already exists, please login' })
            } else {
                // create user
                const newUser = await User.create(req.body);

                // Generates a usertoken storing what we pass in (id, email of newly created user) that we want to encode inside the web token. Encode sensitive information that is only decoded by env file secret key
                const userToken = jwt.sign({ _id: newUser._id, email: newUser.email }, secret, { expiresIn: '2h' })

                // sending user data back to the client
                res.status(201).cookie('userToken', userToken, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }).json(newUser);
            }
        }
        catch (err) {
            res.status(400).json({ error: err })
        }
    },

    loginUser: async (req, res) => {
        try {
            // check if the user already exists
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                // check if the password entered matches the password in the DB for that email specifically the hash, compare function runs everything behind scene and returns a boolean to passwordsMatch
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if (passwordsMatch) {
                    // generate our userToken 
                    const userToken = jwt.sign({ _id: user._id, email: user.email }, secret, { expiresIn: '2h' })
                    // log the user in
                    res.status(201).cookie('userToken', userToken, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }).json(user);

                }
                else {
                    // if email does exist but incorrect password
                    res.status(400).json({ message: 'Invalid email/password' })
                }
            }
            // if the user doesnt exist, our message says email and password so hacker doesnt know which is right
            else {
                res.status(400).json({ message: 'Invalid email/password' })
            }
        }
        catch (err) {
            res.status(400).json({ error: err })
        }
    },

    logoutUser: (req, res) => {
        res.clearCookie('userToken').json({ message: 'You have logged out' })
    },

    followUser: async (req, res) => {
        try {
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true });
            console.log(decodedJwt);
            const loggedInUser = await User.findOne({ _id: decodedJwt.payload._id }); // Get the logged-in user's ID from the JWT
            const userToFollow = await User.findOne({ _id: req.params.id });
            userToFollow.followers.push(loggedInUser._id);
            await userToFollow.save();
            loggedInUser.following.push(userToFollow._id);
            await loggedInUser.save();
            res.status(200).json({ message: 'User followed successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    unfollowUser: async (req, res) => {
        try {
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true });
            const loggedInUserId = decodedJwt.payload._id;
            const userToUnfollowId = req.params.id;

            await User.updateOne(
                { _id: loggedInUserId },
                { $pull: { following: userToUnfollowId } }
            )

            await User.updateOne(
                { _id: userToUnfollowId },
                { $pull: { followers: loggedInUserId } }
            )

            res.status(200).json({ message: 'User unfollowed successfully' });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    grabMyFollowers: async (req, res) => {
        try {
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true });
            console.log(decodedJwt);
            const loggedInUserId = decodedJwt.payload._id;
            const loggedInUser = await User.findById(loggedInUserId);
            const followerUserIds = loggedInUser.followers;
            const followers = await User.find({ _id: { $in: followerUserIds } })
            res.status(200).json(followers);
        }
        catch (err) {
            res.status(400).json({ error: err })
        }
    },

    grabMyFollowing: async (req, res) => {
        try {
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true });
            const loggedInUserId = decodedJwt.payload._id;
            const loggedInUser = await User.findById(loggedInUserId);
            const followingUserIds = loggedInUser.following;
            const following = await User.find({ _id: { $in: followingUserIds } })
            res.status(200).json(following);
        }
        catch (err) {
            res.status(400).json({ error: err })
        }
    },

    findUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.user_id)
            console.log(user);
            res.status(200).json(user)
        }
        catch (err) {
            res.status(400).json({ error: err })
        }
    },

    grabFollowers: async (req, res) => {
        try {
            const user = await User.findById(req.params.user_id)
            const userFollowerIds = user.followers;
            const followers = await User.find({ _id: { $in: userFollowerIds } })
            res.status(200).json(followers)
        }
        catch (err) {
            res.status(400).json({ error: err })
        }
    },

    grabFollowing: async (req, res) => {
        try {
            const user = await User.findById(req.params.user_id)
            const userFollowingIds = user.following;
            const following = await User.find({ _id: { $in: userFollowingIds } })
            res.status(200).json(following)
        }
        catch (err) {
            res.status(400).json({ error: err })
        }
    },

    searchUser: async (req, res) => {
        try {
            const users = await User.find({ firstName: req.params.firstName, lastName: req.params.lastName })
            res.status(200).json(users)
        }
        catch (err) {
            res.status(400).json({ error: err })
        }
    },

    findLoggedInUser: async (req, res) => {
        try {
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true });
            const loggedInUserId = decodedJwt.payload._id;
            const LoggedInUser = await User.findById(loggedInUserId)
            res.status(200).json(LoggedInUser)
        }
        catch (err) {
            res.status(400).json({ error: err })
        }
    }

}