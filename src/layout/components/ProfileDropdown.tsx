import React, { useState } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Typography,
} from '@mui/material';
import fallbackImage from './blank_profile.png';
import { ProfileDropdownProps } from '../../models/profile';

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '4px',
    marginTop: theme.spacing(1),
    minWidth: 180,
    backgroundColor: '#282828',
    color: '#FFFFFF',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  padding: theme.spacing(1, 2),
  fontSize: '14px',
  fontWeight: 500,
  transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
}));

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ userProfile, onLogout }) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleClose();
  };

  const profileImage = userProfile.images?.[0]?.url || fallbackImage;

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2, padding: '4px' }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-label="account of current user"
      >
        <Avatar
          src={profileImage}
          alt={userProfile.display_name}
          sx={{ width: 32, height: 32 }}
        />
        <Typography sx={{ color: 'white', marginLeft: 1, fontWeight: 'bold' }}>
          {userProfile.display_name}
        </Typography>
      </IconButton>
      <StyledMenu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}

        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
 
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <StyledMenuItem onClick={handleLogout}>
          Logout
        </StyledMenuItem>
      </StyledMenu>
    </Box>
  );
};

export default ProfileDropdown;
