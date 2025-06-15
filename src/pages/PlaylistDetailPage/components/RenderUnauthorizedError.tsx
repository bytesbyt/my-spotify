import { Box, Typography } from "@mui/material";
import LoginButton from "../../../common/components/LoginButton";


export const renderUnauthorizedError = () => (
    <Box
      flexDirection="column"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Box
        sx ={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection:"column"
        }}
      >
        <Typography variant="h1" fontWeight={700} mb="20px">
          Sign in again to continue viewing your playlist
        </Typography>
        <LoginButton />
      </Box>
    </Box>
  
);