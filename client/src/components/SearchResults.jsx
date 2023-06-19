import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';

const SearchResults = () => {

    const { firstName, lastName } = useParams()

    const [userList, setUserList] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/searchUser/${firstName}/${lastName}`)
            .then((res) => {
                console.log(res);
                setUserList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

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
            <h2>Users</h2>
            {
                userList.map((user) => (
                    <Box key={user._id} sx={{ bgcolor: '#0f1621', padding: '16px', marginBottom: '20px', borderRadius: '10px' }}>
                        <Button component={Link} to={`/oneUser/${user._id}`} sx={{ textDecoration: 'none', color: 'white' }}>
                            {user.firstName} {user.lastName}
                        </Button>
                    </Box>
                ))
            }
        </Box>
    );
}

export default SearchResults;
