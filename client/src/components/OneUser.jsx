import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import moment from 'moment';

const OneUser = () => {

    const { user_id } = useParams()

    const [posts, setPosts] = useState([])

    const [user, setUser] = useState({})

    const [followers, setFollowers] = useState([])

    const [following, setFollowing] = useState([])

    const [loggedInUser, setLoggedInUser] = useState({})

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/userPosts/${user_id}`)
            .then((res) => {
                console.log(res);
                setPosts(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/findUser/${user_id}`)
            .then((res) => {
                console.log(res);
                setUser(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/followers/${user_id}`)
            .then((res) => {
                console.log(res);
                setFollowers(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/following/${user_id}`)
            .then((res) => {
                console.log(res);
                setFollowing(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/loggedInUser', { withCredentials: true })
            .then((res) => {
                console.log(res);
                setLoggedInUser(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const followUser = (id) => {
        axios
            .post(`http://localhost:8000/api/follow/${id}`, {}, { withCredentials: true })
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const unfollowUser = (id) => {
        axios
            .post(`http://localhost:8000/api/unfollow/${id}`, {}, { withCredentials: true })
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Box sx={{ bgcolor: '#141d26', color: 'white', height: '100vh', padding: '16px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Button component={Link} to='/feed' sx={{ textDecoration: 'none', color: 'white' }}>
                    Social Site
                </Button>
                <Button component={Link} to='/profile' sx={{ textDecoration: 'none', color: 'white' }}>
                    Profile
                </Button>
            </Box>
            <h2>{user.firstName} {user.lastName}'s Profile</h2>
            <br />
            {
                loggedInUser.following && loggedInUser.following.includes(user_id) ?
                    <Button sx={{ color: 'white' }} onClick={() => unfollowUser(user._id)}>Unfollow</Button> :
                    <Button sx={{ color: 'white' }} onClick={() => followUser(user._id)}>Follow</Button>
            }
            <br />
            <Box sx={{ display: 'flex', alignItems: 'top', justifyContent: 'space-around', gap: '16px', marginTop: '20px' }}>
                <Box sx={{ display: 'flex', gap: '25px' }}>
                    <Box>
                        <h3>Following</h3>
                        {
                            following.map((user) => (
                                <Box key={user._id} sx={{ bgcolor: '#0f1621', padding: '16px', marginBottom: '20px', borderRadius: '10px' }}>
                                    <Button component={Link} to={`/oneUser/${user._id}`} sx={{ textDecoration: 'none', color: 'white' }}>
                                        {user.firstName} {user.lastName}
                                    </Button>
                                </Box>
                            ))
                        }
                    </Box>
                    <Box>
                        <h3>Followers</h3>
                        {
                            followers.map((follower) => (
                                <Box key={follower._id} sx={{ bgcolor: '#0f1621', padding: '16px', marginBottom: '20px', borderRadius: '10px' }}>
                                    <Button component={Link} to={`/oneUser/${follower._id}`} sx={{ textDecoration: 'none', color: 'white' }}>
                                        {follower.firstName} {follower.lastName}
                                    </Button>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
                <Box>
                    <h3>Their Posts</h3>
                    {
                        posts.map((post) => (
                            <Box key={post._id} sx={{ bgcolor: '#0f1621', padding: '16px', marginBottom: '20px', borderRadius: '10px' }}>
                                <p>{post.content}</p>
                                <p>{moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
        </Box>
    );
}

export default OneUser;
