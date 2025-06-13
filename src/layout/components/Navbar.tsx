import { Avatar, Box, ListItemIcon, Menu, MenuItem, styled } from "@mui/material";
import React, { useState } from 'react'
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import BasicAvatar from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import fallbackImage from "./blank_profile.png"
import useUserLogout from "../../hooks/useUserLogout";

const ProfileContainer = styled("div")({
  display: "flex",
  justifyContent: 'flex-end',
  alignItems: "center",
  borderRadius: "8px",
  padding: "0 8px",
});

const ProfileImage = styled('div')({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
});

const Navbar = () => {
  const {data: userProfile} = useGetCurrentUserProfile();
  const logout = useUserLogout();


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  

  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

  const closeMenu = () => {
        setAnchorEl(null);
    };

  return (
        <ProfileContainer>
            {userProfile ? (
                <ProfileImage>
                    <Avatar onClick={openMenu} src={userProfile.images[0]?.url}>
                        {!userProfile.images[0] && <BasicAvatar />}
                    </Avatar>
                    <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
                        <MenuItem onClick={logout}>
                            <ListItemIcon sx={{ color: 'white' }}>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            Log out
                        </MenuItem>
                    </Menu>
                </ProfileImage>
            ) : (
                <LoginButton />
            )}
        </ProfileContainer>
    );
};

export default Navbar;
