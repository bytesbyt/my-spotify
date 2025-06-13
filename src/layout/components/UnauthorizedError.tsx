import { Box, Typography } from "@mui/material";
import LoginButton from "../../common/components/LoginButton";

export const renderUnauthorizedError = () => (
<Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    height="100%"
    flexDirection="column"
>
    <Typography variant="h2" fontWeight={700} mb="20px">
    Please login again
    </Typography>
    <LoginButton />
</Box>
);