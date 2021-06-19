import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import {Notifications, Forum} from '@material-ui/icons';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import UserAvatar from '../assets/img/avatar.png'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: '#F4F8FB',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      display: 'none',
    },
    title: {
      flexGrow: 1,
    //   fontWeight: 'bold',
      color: '#000000'
    },
}));


const Header = ({handleToggleSidebar, toggled, pageName }) => {
    const history = useHistory();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return(
        <AppBar position="static" style={{ backgroundColor: 'white', color: '#9DADBC' }}>
            <Toolbar>
                <IconButton edge="start" className={`${classes.menuButton} toggle-menu`} color="inherit" aria-label="menu" onClick={() => handleToggleSidebar(!toggled)}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {pageName}
                </Typography>
                <div>
                    <IconButton aria-label="show 1 new notifications" color="inherit">
                        {/* <Badge badgeContent={1} color="secondary"> */}
                            <Forum /> 
                        {/* </Badge> */}
                    </IconButton>
                    <IconButton aria-label="show 1 new notifications" color="inherit">
                        <Badge badgeContent={1} color="secondary">
                            <Notifications />
                        </Badge>
                    </IconButton>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Avatar alt="Remy Sharp" src={UserAvatar} />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => { handleClose(); history.push("/"); }}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>

    )
}

export default Header