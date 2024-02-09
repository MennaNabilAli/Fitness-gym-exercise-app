import { Stack } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/Logo.png';
import '../styles/Navbar.css';

function Navbar(props) {
    return (
        <Stack direction={'row'} justifyContent={'space-around'} 
        sx={{gap:{sm:'122px' , xs:'40px'} , mt:{sm:'32px' , xs:'20px'}, justifyContent:'none'}} px={'20px'}> 
            <Link to={'/'}>
                <img src={Logo} alt=''/>
            </Link>
            <Stack direction={'row'} gap={'40px'} fontSize={'24px'} alignItems={'flex-end'}>
                <div className='link_home'>
                <Link to={'/'}> Home </Link>
                </div>
                <a href='#exercises'>Exercises</a>
            </Stack>
        </Stack>
    );
}

export default Navbar;