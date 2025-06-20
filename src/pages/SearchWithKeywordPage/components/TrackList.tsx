import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  Tooltip,
  useMediaQuery,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import useAddItemToPlaylist from "../../../hooks/useAddItemToPlaylist";
import { Track } from "../../../models/commonType";
import LoginModal from "./LoginModal";
import theme from "../../../theme";

interface Props {
  track: Track;
}

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const TrackListItem = ({ track }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const open = Boolean(anchorEl);
  const { data: userProfile } = useGetCurrentUserProfile();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetCurrentUserPlaylists({ limit: 10, offset: 0 });
  const { mutate: addItemToPlaylist } = useAddItemToPlaylist();

  const playlists =
    data?.pages
      .flatMap((page) => page.items)
      .filter((playlist) => playlist.owner?.id === userProfile?.id) || [];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToPlaylist = (playlistId: string) => {
    if (track.uri) {
      addItemToPlaylist(
        { playlist_id: playlistId, uris: [track.uri] },
        {
          onSuccess: () => {
            setSnackbarMessage("Track added to playlist successfully!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            handleClose();
          },
          onError: () => {
            setSnackbarMessage("Failed to add track to playlist");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
          },
        }
      );
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 8px",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "8px",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          <Avatar
            src={track.album?.images?.[0]?.url}
            alt={track.name}
            variant="square"
            sx={{ width: 48, height: 48, borderRadius: 1 }}
          />
          <Box>
            <Typography fontWeight={600}>{track.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {track.artists?.map((a) => a.name).join(", ")}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ minWidth: 50 }}>
          {track.duration_ms ? formatDuration(track.duration_ms) : "-"}
        </Typography>

        {!isMobile && (

        <Tooltip title="Add to playlist" placement="top">
          <IconButton
            onClick={(event) => {
              if (userProfile) {
                handleClick(event);
              } else {
                setLoginModalOpen(true);
              }
            }}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: "rgba(30, 215, 96, 0.1)",
              border: "1px solid rgba(30, 215, 96, 0.3)",
              color: "#1ed760",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(30, 215, 96, 0.2)",
                border: "1px solid #1ed760",
                transform: "scale(1.05)",
                boxShadow: "0 4px 12px rgba(30, 215, 96, 0.3)",
              },
            }}
          >
            <AddIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      )}

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            style: { maxHeight: 48 * 5, width: "220px", overflowY: "auto" },
            onScroll: (e: React.UIEvent<HTMLElement>) => {
              const target = e.currentTarget;
              const bottom =
                target.scrollHeight - target.scrollTop === target.clientHeight;
              if (bottom && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            },
          }}
        >
          {playlists.map((playlist) => (
            <MenuItem
              key={playlist.id}
              onClick={() => handleAddToPlaylist(playlist.id!)}
            >
              <Typography variant="body2">
                Add to {playlist.name}
              </Typography>
            </MenuItem>
          ))}

          {isFetchingNextPage && (
            <MenuItem disabled>
              <Typography variant="body2" color="text.secondary">
                Loading playlists...
              </Typography>
            </MenuItem>
          )}
        </Menu>
      </Box>


      <LoginModal 
        open={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TrackListItem;