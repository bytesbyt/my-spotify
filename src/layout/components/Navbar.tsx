import { Avatar, Box, ListItemIcon, Menu, MenuItem, styled } from "@mui/material";
import React, { useState } from 'react'
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import BasicAvatar from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import useUserLogout from "../../hooks/useUserLogout";
import { useLocation } from 'react-router';
import SearchBar from '../../common/components/SearchBar';

const ProfileContainer = styled("div")({
  display: "flex",
  justifyContent: 'flex-end',
  alignItems: "center",
  borderRadius: "8px",
  padding: "0 8px",
  width: "100%",
  position: "relative",
});

const SearchContainer = styled(Box)({
  position: "absolute",
  left: "16px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "420px",
  maxWidth: "calc(100% - 200px)",
});

const ProfileImage = styled('div')({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
});

const Navbar = () => {
  const {data: userProfile} = useGetCurrentUserProfile();
  const logout = useUserLogout();
  const location = useLocation();
  const isSearchPage = location.pathname.startsWith('/search');

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
            {isSearchPage && (
              <SearchContainer>
                <SearchBar />
              </SearchContainer>
            )}
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
