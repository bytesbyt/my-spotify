import React from 'react'
import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import { Box, Grid, styled, Typography } from '@mui/material';
import DefaultImage from '../../layout/components/DefaultImage';
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LoadingSpinner from '../../common/components/LoadingSpinner';
import spotify from './spotify.png';

const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  width: "20vh",
  maxWidth: "350px",
  aspectRatio: "1 / 1",
  objectFit: "cover",
  [theme.breakpoints.down("md")]: {
    maxWidth: "200px",
  },
  boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.4)",
}));

const PlaylistHeaderContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  },
}));

const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  textAlign: "left",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
}));

const PlaylistDetailPage: React.FC = () => {
  const {id} = useParams < {id?: string }>();
  const {data: playlist, isLoading, isError } = useGetPlaylist({playlist_id : id ?? ''});

  if (!id) return <Navigate to = "/" />;
  if (isLoading) return <LoadingSpinner />;
  if (isError || !playlist) return <div>Failed to load the playlist</div>

  return (
    <PlaylistHeaderContainer container spacing={{ xs: 2, md: 4}}>
      <ImageGrid item sm={12} md={2}>
        {playlist?.images ? (
          <AlbumImage
            src={playlist?.images[0].url}
            alt={`${playlist.name || 'Playlist'} cover`}
          />
          ) : (
          <DefaultImage>
            <MusicNoteIcon fontSize="large" />
          </DefaultImage>
          )}
      </ImageGrid>

      <Grid item sm={12} md={10}>
        <Box>
          <ResponsiveTypography variant="h1" color="white" mb={2}>
              {playlist?.name}
          </ResponsiveTypography>
          <Box display= "flex" alignItems = "center">
            <img src = {spotify} alt = "Spotify logo"
              width = "20px"
            />
            <Typography variant ="subtitle1" color="#FFFFFF" ml={1} fontWeight={700}>
               { playlist?.owner?.display_name? playlist?.owner?.display_name : "unknown"  }
            </Typography>
            <Typography variant ="subtitle1" color="#FFFFFF" ml={1} fontWeight={700}>
              • { playlist?.tracks?.total? playlist?.tracks?.total : "0" } songs
            </Typography>
          </Box>
        </Box>

      </Grid>


    </PlaylistHeaderContainer> 
  );
};

export default PlaylistDetailPage;
