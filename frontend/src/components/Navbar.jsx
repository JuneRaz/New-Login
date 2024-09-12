import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useAuth from '../hooks/useAuth'; // Assuming this is where your authentication hook is
import useLogout from "../hooks/useLogout"; // Import the useLogout hook
import AuthContext from "../context/AuthProvider";


function Home() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { auth } = useAuth(); // Get authentication status from useAuth
    
    const handleFloodMonitoringClick = () => {
        // Check if user is logged in
        if (auth?.user) {
            // If logged in, redirect to home
            navigate('/home');
        } else {
            // If not logged in, redirect to '/'
            navigate('/');
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ color: theme.palette.primary.main, backgroundColor: theme.palette.background.default }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {/* Call the handleFloodMonitoringClick function when clicked */}
                        <Button color="inherit" onClick={handleFloodMonitoringClick} style={{ color: 'black' }}>
                            Flood Monitoring System
                        </Button>
                    </Typography>

                    {/* Conditional rendering based on authentication status */}
                    {auth?.user ? (
                        // Show "Home" and "Map" when user is logged in
                        <>
                            <Link to='/home'>
                                <Button color='inherit' style={{ color: 'black' }}>Home</Button>
                            </Link>
                           
                                <button onClick={handleLogout}>Sign Out</button>
                           
                        </>
                    ) : (
                        // Show "Login", "Signup", and "OTP" when user is not logged in
                        <>
                            <Link to='/'>
                                <Button color='inherit' style={{ color: 'black' }}>Login</Button>
                            </Link>
                            <Link to='/signup'>
                                <Button color='inherit' style={{ color: 'black' }}>Signup</Button>
                            </Link>
                            <Link to='/home'>
                                <Button color='inherit' style={{ color: 'black' }}>Map</Button>
                            </Link>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Home;
