import { Avatar, Box, styled } from "@mui/material";
import React from 'react'
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";

const ProfileContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "8px",
  padding: "0 8px",
  height: "100%",
});

const Navbar = () => {
  const {data: userProfile} = useGetCurrentUserProfile();
  const profileImage = userProfile?.images?.[0]?.url || "";

  return (
    <Box 
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        height= "64px"
    >
      {userProfile ? (
        <ProfileContainer>
            <Avatar
            src= {profileImage}
            alt= {userProfile.display_name}
            />        
        </ProfileContainer>

    ) : (<LoginButton />)}
    </Box>
  )
}
export default Navbar
