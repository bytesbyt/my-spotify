import { Box, styled } from '@mui/material';
import React from 'react';
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import fallbackImage from './blank_profile.png';
import ProfileDropdown from './ProfileDropdown';
import { handleLogout } from '../../utils/authUtils';
import { useNavigate } from 'react-router';

const ProfileContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: '8px',
  padding: '0 8px',
  height: '100%',
});

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const profileImage = userProfile?.images?.[0]?.url || fallbackImage;

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
    >
      {userProfile ? (
        <ProfileDropdown userProfile={userProfile} onLogout={handleLogout} />
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};
export default Navbar;
