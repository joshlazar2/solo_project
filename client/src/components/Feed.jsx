import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import moment from 'moment';

const Feed = () => {

    const navigate = useNavigate();

    const [postList, setPostList] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/feedPosts', { withCredentials: true })
            .then((res) => {
                console.log(res);
                setPostList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const [searchUser, setSearchUser] = useState({
        firstName: '',
        lastName: ''
    })

    const changeHandler = (e) => {
        setSearchUser({ ...searchUser, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        navigate(`/searchResults/${searchUser.firstName}/${searchUser.lastName}`)
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
            <Box component='form' onSubmit={submitHandler} sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <label>Search Users</label>
                <TextField
                    type='text'
                    name='firstName'
                    placeholder='First Name'
                    onChange={changeHandler}
                    sx={{ bgcolor: 'white', borderRadius: '30px' }}
                />
                <TextField
                    type='text'
                    name='lastName'
                    placeholder='Last Name'
                    onChange={changeHandler}
                    sx={{ bgcolor: 'white', borderRadius: '30px' }}
                />
                <Button type='submit' variant='contained' sx={{ bgcolor: 'white', color: '#141d26', borderRadius: '2rem' }}>
                    Search
                </Button>
            </Box>
            <h2>Feed</h2>
            <Button component={Link} to='/createPost' variant='contained' sx={{ bgcolor: 'white', color: '#141d26', marginTop: '20px', borderRadius: '30px', marginBottom: '20px' }}>
                Post
            </Button>
            <Box sx={{ marginTop: '20px' }}>
                {postList.map((post) => (
                    <Box key={post._id} sx={{ bgcolor: '#0f1621', padding: '16px', marginBottom: '20px', borderRadius: '10px' }}>
                        <Link to={`/oneUser/${post.user_id}`} style={{ textDecoration: 'none', color: 'white' }}>
                            <h4>{post.creator}</h4>
                        </Link>
                        <p>{post.content}</p>
                        <p>{moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default Feed;
