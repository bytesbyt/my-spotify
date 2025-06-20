import React from 'react';
import { styled, Box, Typography } from '@mui/material';
import { NavLink } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const BottomNavContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '8px 0',
  zIndex: 1000,
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const NavItem = styled(NavLink)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  padding: '4px 12px',
  minWidth: '64px',
  '&.active': {
    color: theme.palette.primary.main,
  },
}));

const NavText = styled(Typography)(({ theme }) => ({
  fontSize: '10px',
  fontWeight: 500,
  marginTop: '2px',
  textAlign: 'center',
}));

const MobileBottomNavigation: React.FC = () => {
  return (
    <BottomNavContainer>
      <NavItem to="/">
        <HomeIcon fontSize="small" />
        <NavText>Home</NavText>
      </NavItem>
      <NavItem to="/search">
        <SearchIcon fontSize="small" />
        <NavText>Search</NavText>
      </NavItem>
      <NavItem to="/playlist">
        <LibraryMusicIcon fontSize="small" />
        <NavText>Your Library</NavText>
      </NavItem>
    </BottomNavContainer>
  );
};

export default MobileBottomNavigation; 