import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Box, Button, TextField, TextareaAutosize } from '@mui/material';

const EditPost = () => {

    const navigate = useNavigate();

    const { id } = useParams()

    const [post, setPost] = useState({
        content: ''
    })

    const [error, setError] = useState('')

    const changeHandler = (e) => {
        setPost({ [e.target.name]: e.target.value })
    }

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/findPost/${id}`)
            .then((response) => {
                console.log(response);
                setPost(response.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/updatePost/${id}`, post, { withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate('/profile')
            })
            .catch((err) => {
                console.log(err.response.data.errors);
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
            <h2>Edit post</h2>
            <Box component='form' onSubmit={submitHandler}>
                <TextareaAutosize style={{ width: '50%' }} minRows={3} name="content" placeholder='Content' value={post.content} onChange={changeHandler}></TextareaAutosize>
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

export default EditPost;
