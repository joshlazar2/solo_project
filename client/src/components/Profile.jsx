import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import moment from 'moment';

const Profile = () => {

    const navigate = useNavigate();

    const logoutUser = () => {
        axios
            .post('http://localhost:8000/api/logout', {}, { withCredentials: true })
            .then((res) => {
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const [postList, setPostList] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/allPostsByLoggedInUser', { withCredentials: true })
            .then((res) => {
                console.log(res);
                setPostList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const [followers, setFollowers] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/myFollowers', { withCredentials: true })
            .then((res) => {
                console.log(res);
                setFollowers(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const [following, setFollowing] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/myFollowing', { withCredentials: true })
            .then((res) => {
                console.log(res);
                setFollowing(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const deleteHandler = (id) => {
        axios
            .delete(`http://localhost:8000/api/deletePost/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res);
                const updatedPostList = postList.filter((post) => post._id !== id)
                setPostList(updatedPostList)
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
                <Button sx={{ color: 'white' }} onClick={logoutUser}>Logout</Button>
            </Box>
            <h2>My Profile</h2>
            <br />
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '16px',
                marginTop: '20px',
            }}>
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
                    <Box sx={{ order: { xs: 1, md: 2 } }}>
                        <h3>My Posts</h3>
                        {
                            postList.map((post) => (
                                <Box key={post._id} sx={{ bgcolor: '#0f1621', padding: '16px', marginBottom: '20px', borderRadius: '10px' }}>
                                    <p style={{ wordBreak: 'normal', whiteSpace: 'normal' }}>{post.content}</p>
                                    <p>{moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                    <Button component={Link} to={`/editPost/${post._id}`} sx={{ bgcolor: 'white', color: '#141d26', marginTop: '20px', borderRadius: '30px', marginBottom: '20px', marginRight: '10px' }}>
                                        Edit
                                    </Button>
                                    <Button sx={{ bgcolor: 'white', color: '#141d26', marginTop: '20px', borderRadius: '30px', marginBottom: '20px' }} onClick={() => deleteHandler(post._id)}>Delete</Button>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Profile;
