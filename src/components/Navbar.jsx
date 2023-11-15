import { AppBar, Button, IconButton, InputBase, Toolbar, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import FlexBetween from './FlexBetween.jsx';
import { Search, LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material';
import { setMode } from 'state';

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
  
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
  
    return (
      <AppBar
        sx={{
          position: "static",
          background: "none",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Lado Izquierdo */}
          <FlexBetween>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
          </FlexBetween>
  
          {/* Lado Derecho */}
          <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <SettingsOutlined sx={{ fontSize: "25px" }} />
            </IconButton>
          </FlexBetween>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Navbar;