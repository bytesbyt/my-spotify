import React, { useEffect, useRef } from 'react'
import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import { Box, Grid, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DefaultImage from '../../layout/components/DefaultImage';
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LoadingSpinner from '../../common/components/LoadingSpinner';
import spotify from './spotify.png';
import ErrorMessage from '../../common/components/ErrorMessage';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';
import { PagesTwoTone } from '@mui/icons-material';
import DesktopPlaylistItem from './components/DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import { useInView } from 'react-intersection-observer';
import LoginButton from '../../common/components/LoginButton';
import { AxiosError } from 'axios';


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

  const scrollContainerRef = useRef(null);
  
  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    error: playlistError,
  } = useGetPlaylist({playlist_id : id});

  const { ref, inView } = useInView({
    root: scrollContainerRef.current,
    rootMargin: "100px 0px", 
  });

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = useGetPlaylistItems({playlist_id: id, limit: PAGE_LIMIT});
  useEffect(() => {
    if(inView && hasNextPage && !isFetchingNextPage){
      fetchNextPage();
    }
  }, [inView]);

  if (isPlaylistLoading ) return <LoadingSpinner />;

  const renderUnauthorizedError = () => (
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

  if (
    (playlistError instanceof AxiosError && playlistError.response?.status === 401) ||
    (playlistItemsError instanceof AxiosError && playlistItemsError.response?.status === 401)
  ) {
    return renderUnauthorizedError();
  };

  if (playlistError) {
    return <ErrorMessage errorMessage="Failed to load playlist" />;
  };

  if (playlistItemsError) {
      return <ErrorMessage errorMessage="failed to load playlist items" />;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '90%', backgroundColor: '#121212' , color: 'white' }}>
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
      {playlist?.tracks?.total === 0 ? <Typography>***Search***</Typography> : <TableContainer
        ref = {scrollContainerRef}
        sx={{ 
          flexGrow: 1,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          }
        }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx = {{
                '& .MuiTableCell-root': {
                  color: '#B3B3B3',
                  borderBottom: 'none'
                },
                '& tr:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  cursor: 'poiner',
                },
              }}
            >
              {playlistItems?.pages.map((page, pageIndex) =>
                page.items.map((item, itemIndex) => (
                  <DesktopPlaylistItem
                    item={item} 
                    key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                  />
                ))
              )}
              <TableRow ref={ref}>
                {isFetchingNextPage && (
                  <TableCell colSpan={5} sx={{ textAlign: 'center', borderBottom: 'none' }}>
                    <LoadingSpinner />
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      }   
    </Box>
  );
};

export default PlaylistDetailPage;
