import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';

const Register = () => {

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})

    const [emailError, setEmailError] = useState('')

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/register', user, {withCredentials:true})
            .then((res) => {
                console.log(res);
                navigate('/feed')
            })
            .catch((err) => {
                console.log(err);
                err.response.data.message ?
                setEmailError(err.response.data.message):
                setErrors(err.response.data.error.errors)
            })
    }

    return (
        <Box sx={{ bgcolor: '#141d26', color: 'white', height: '100vh', padding: '16px' }}>
            <Box className='d-flex justify-content-between p-3'>
                <h1>Social Site</h1>
                <Button component={Link} to='/' sx={{ textDecoration: 'none', color: 'white' }}>
                    Login
                </Button>
            </Box>
            <Box component='form' onSubmit={submitHandler} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <label>First Name:</label>
                    <TextField
                    type='text'
                    name='firstName'
                    value={user.firstName}
                    onChange={changeHandler}
                    sx={{ bgcolor: 'white', borderRadius: '30px' }}
                    />
                    {
                        errors.firstName ?
                            <p className='text-danger'>{errors.firstName.message}</p> :
                            null
                    }
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <label>Last Name:</label>
                    <TextField
                    type='text'
                    name='lastName'
                    value={user.lastName}
                    onChange={changeHandler}
                    sx={{ bgcolor: 'white', borderRadius: '30px' }}
                    />
                    {
                        errors.lastName ?
                            <p className='text-danger'>{errors.lastName.message}</p> :
                            null
                    }
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <label>Email:</label>
                    <TextField
                    type='text'
                    name='email'
                    value={user.email}
                    onChange={changeHandler}
                    sx={{ bgcolor: 'white', borderRadius: '30px' }}
                    />
                    {
                        errors.email ?
                            <p className='text-danger'>{errors.email.message}</p> :
                            null
                    }
                    {
                        emailError ?
                            <p className='text-danger'>{emailError}</p> :
                            null
                    }
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
                    {
                        errors.password ?
                            <p className='text-danger'>{errors.password.message}</p> :
                            null
                    }
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <label>Confirm Password:</label>
                    <TextField
                    type='text'
                    name='confirmPassword'
                    value={user.confirmPassword}
                    onChange={changeHandler}
                    sx={{ bgcolor: 'white', borderRadius: '30px' }}
                    />
                    {
                        errors.confirmPassword ?
                            <p className='text-danger'>{errors.confirmPassword.message}</p> :
                            null
                    }
                </Box>
                <Button type='submit'>Register</Button>
            </Box>
        </Box>
    );
}

export default Register;
