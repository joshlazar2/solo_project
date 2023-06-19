import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/login', user, {withCredentials:true})
            .then((res) => {
                console.log(res);
                navigate('/feed')
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data.message)
            })
    }

    return (
        <Box sx={{ bgcolor: '#141d26', color: 'white', height: '100vh', padding: '16px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }} className='d-flex justify-content-between p-3'>
                <h1>Social Site</h1>
                <Button component={Link} to='/register' sx={{ textDecoration: 'none', color: 'white' }}>
                    Register
                </Button>
            </Box>
            <Box component='form' onSubmit={submitHandler} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <label>Email:</label>
                    <TextField
                    type='text'
                    name='email'
                    value={user.email}
                    onChange={changeHandler}
                    sx={{ bgcolor: 'white', borderRadius: '30px' }}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <label>Password:</label>
                    <TextField
                    type='text'
                    name='password'
                    value={user.password}
                    onChange={changeHandler}
                    sx={{ bgcolor: 'white', borderRadius: '30px' }}
                    />
                </Box>
                {
                    error ?
                    <p className='text-danger'>{error}</p> :
                    null
                }
                <Button type='submit'>Login</Button>
            </Box>
        </Box>
    );
}

export default Login;
