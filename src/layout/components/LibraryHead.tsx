import React from 'react'
import { styled, Box, Typography, Button } from "@mui/material"
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';

const Head = styled("div")({
    display: "flex",
    alignItems: "center",
    padding: "8px",
    justifyContent: "space-between",
});

const LibraryHead = () => {
  const {mutate: createPlaylist} = useCreatePlaylist()
    const handleCreatePlaylist = () => {
      createPlaylist({ name: "My Playlist"});
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
