import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, TextareaAutosize } from '@mui/material';

const CreatePost = () => {

    const navigate = useNavigate();

    const [post, setPost] = useState({
        content: ''
    })

    const [error, setError] = useState('')

    const changeHandler = (e) => {
        setPost({ [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/createPost', post, { withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate('/feed')
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data.errors)
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
            <h2>Create a post</h2>
            <Box component='form' onSubmit={submitHandler}>
                <TextareaAutosize style={{ width: '50%' }} minRows={3} name="content" placeholder='Content' onChange={changeHandler}></TextareaAutosize>
                <br />
                {
                    error ?
                        <p>{error.content.message}</p> :
                        null
                }
                <Button type='submit' sx={{ textDecoration: 'none', color: 'white' }}>Post</Button>
            </Box>
        </Box>
    );
}

export default CreatePost;
