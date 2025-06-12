import React from 'react'
import { styled, Box, Typography, Button } from "@mui/material"
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import { useNavigate } from 'react-router';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { getSpotifyAuthUrl } from '../../utils/auth';

const Head = styled("div")({
    display: "flex",
    alignItems: "center",
    padding: "8px",
    justifyContent: "space-between",
});

const LibraryHead = () => {
  const navigate = useNavigate();

  const {data: user, isLoading: isUserLoading } = useGetCurrentUserProfile();
  const {mutate: createPlaylist} = useCreatePlaylist()

  const handleCreatePlaylist = () => {
    if (!isUserLoading && !user) {
      getSpotifyAuthUrl();
      return;
    }

    if (user) {
      createPlaylist({ name: "My Playlist", description: "A new playlist"});
    }   
  };

  return (
    <Head>
        <Box display = "flex">
            <BookmarkIcon sx= {{ marginRight: "20px" }}/>
            <Typography variant="h2" fontWeight={700}> Your Library</Typography>
        </Box>
        <Button onClick = {handleCreatePlaylist}>
            <AddIcon />
        </Button>
    </Head>
  );
};

export default LibraryHead
