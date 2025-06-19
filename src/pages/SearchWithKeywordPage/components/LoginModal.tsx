import React from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { getSpotifyAuthUrl } from "../../../utils/auth";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal = ({ open, onClose }: LoginModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: '#1ed760',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <LoginIcon sx={{ fontSize: 28, color: 'white' }} />
        </Box>

        <Typography
          id="login-modal-title"
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
            color: 'white',
            mb: 2,
          }}
        >
          Login Required
        </Typography>

        <Typography
          id="login-modal-description"
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            mb: 3,
            lineHeight: 1.5,
          }}
        >
          To add tracks to your playlists, you need to log in with your Spotify account.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={() => getSpotifyAuthUrl()}
            startIcon={<LoginIcon />}
            sx={{
              backgroundColor: '#1ed760',
              color: 'white',
              fontWeight: 500,
              px: 3,
              py: 1,
              borderRadius: 1,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#1db954',
              },
            }}
          >
            Login with Spotify
          </Button>

          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 500,
              px: 3,
              py: 1,
              borderRadius: 1,
              textTransform: 'none',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginModal; 