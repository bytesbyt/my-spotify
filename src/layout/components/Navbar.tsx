import { Box } from "@mui/material";
import React from 'react'
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";


const Navbar = () => {
  const {data: userProfile} = useGetCurrentUserProfile()
  return (
    <Box 
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        height= "64px"
    >
      {userProfile ? <img src= {userProfile.images[0].url} /> : <LoginButton />}
      
    </Box>
  )
}

export default Navbar
