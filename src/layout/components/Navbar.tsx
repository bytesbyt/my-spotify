import { Avatar, Box, ListItemIcon, Menu, MenuItem, styled, useTheme, useMediaQuery } from "@mui/material";
import React, { useState } from 'react'
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import BasicAvatar from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import fallbackImage from "./blank_profile.png"
import useUserLogout from "../../hooks/useUserLogout";
import { useLocation } from 'react-router';
import SearchBar from '../../common/components/SearchBar';
import { useNavigate } from 'react-router';



const ProfileContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: 'space-between',
  alignItems: "center",
  borderRadius: "8px",
  padding: "0 8px",
  width: "100%",
  position: "relative",
  [theme.breakpoints.down('sm')]: {
    padding: "10px 6px",
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    marginRight: theme.spacing(1),
  },
}));

const ProfileImage = styled('div')({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    flexShrink: 0,
});

const Navbar = () => {
  const navigate = useNavigate();
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

  const handleSelect = (keyword: string) => {
    navigate(`/search/${encodeURIComponent(keyword)}`);
  };

  return (
        <ProfileContainer>
            {isSearchPage ? (
              <SearchContainer>
                  <SearchBar onSelect={handleSelect} />
              </SearchContainer>
            ) : (
              <div style = {{ flex:1 }} />
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
