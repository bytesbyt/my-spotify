import React from 'react'
import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import { Box, Grid, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DefaultImage from '../../layout/components/DefaultImage';
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LoadingSpinner from '../../common/components/LoadingSpinner';
import spotify from './spotify.png';
import ErrorMessage from '../../common/components/ErrorMessage';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';


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
  if (id === undefined ) return <Navigate to = "/" />;
  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    error: playlistError,
  } = useGetPlaylist({playlist_id : id});

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = useGetPlaylistItems({playlist_id: id, limit: 10});

  console.log("ddd", playlistItems );

  if (isPlaylistLoading) return <LoadingSpinner />;
  if (playlistError)
    return <ErrorMessage errorMessage = {playlistError.message} />;

  return (
    <div>
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
      {playlist?.tracks?.total === 0 ? <Typography>Search</Typography> : <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Date Added</TableCell>
              <TableCell>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {playlist?.pages.map(page=>page.items.map(item =>{
              return <DesktopPlaylistItem/>
            }))} */}
          </TableBody>
        </Table>
      </TableContainer>
      }

      
      
    </div>

  );
};

export default PlaylistDetailPage;
