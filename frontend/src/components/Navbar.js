import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction, userProfileAction } from '../redux/actions/userAction';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import { base } from '../utils/config';



const pages = ['Home', 'Log In'];


const Navbar = () => {
    const[name,setName]=useState('')
    const findname=async()=>{
        try {
            const {data}=await axios.get(`${base}/api/me`,{ withCredentials: true})
        console.log(data);
        setName(data.user.name)
        } catch (error) {
            console.log(error)
            
        }
        
    }
    useEffect(() => {
        findname();
    }, [])
    const {userInfo} = useSelector((state) => state.signIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // log out use
    const logOut = () => {
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(() => {
            toast.success("Logged out successfully!!")
            navigate('/');
            
           
        }, 500)
    }


    return (
        <AppBar position="static">
            <Container >
                {/* principal Menu */}
                <Toolbar disableGutters>
                    <StickyNote2Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Arial',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Content corner
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <StickyNote2Icon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Arial',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                       Content corner
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* menu desktop */}
                    
                        

                        {
                            userInfo&&userInfo.role==='admin'?<><Typography sx={{ my: 2, color: 'white', display: 'block',pl:40,
                            fontWeight: 700, }}>Welcome  {name}</Typography></>:userInfo&&userInfo.role==='user'?<><Typography sx={{ my: 2, color: 'white', display: 'block',pl:40, 
                            fontWeight: 700, }}>Welcome  {name}</Typography></>:<> </>
                        }


                    </Box>


                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            PaperProps={{
                                sx: {
                                    "& 	.MuiMenu-list": {
                                        bgcolor: "primary.white",
                                        color: "white"
                                    },
                                }
                            }}

                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                        {userInfo && userInfo.role=='admin'?<><MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none" }} to="/admin/dashboard">Admin panel </Link></Typography>
                            </MenuItem>
                            <MenuItem onClick={logOut}>
                                        <Typography textAlign="center" color='#8e67b3'>Log Out </Typography>
                                    </MenuItem></>
                            :userInfo && userInfo.role=='user'?<> <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none" }} to="/user/dashboard">User panel</Link></Typography>
                            </MenuItem>
                            <MenuItem onClick={logOut}>
                                        <Typography textAlign="center" color='#8e67b3'>Log Out </Typography>
                                    </MenuItem></>:<><MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center"><Link style={{ textDecoration: "none" }} to="/login">Login </Link></Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center"><Link style={{ textDecoration: "none" }} to="/register">Register </Link></Typography>
                                    </MenuItem></>
                                    
                            }           

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;