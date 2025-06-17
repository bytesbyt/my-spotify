import React, { useEffect } from 'react'
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import ErrorMessage from '../../common/components/ErrorMessage';
import { Box, Button, Card, styled, Typography } from '@mui/material';
import Playlist from './Playlist';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { useInView } from 'react-intersection-observer';

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 227px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", 
    scrollbarWidth: "none", 
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));

const Library = () => {
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0
  });

  const { data: user} = useGetCurrentUserProfile();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage){
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!user) return <EmptyPlaylist />;
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <Box sx= {{ width: '100%', height: '100%' }}>
      {!data || data?.pages[0].total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
          {data?.pages.map((page, index) => (
            <Playlist playlists={page.items} key={index}/>
          ))}
          <Box
            ref={ref}
            sx= {{ 
              height: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 2,
            }}
          >
            {isFetchingNextPage && <LoadingSpinner />}
          </Box>
        </PlaylistContainer>
      )}
    </Box>
  );
};

export default Library;


function userGetCurrentUserProfile(): { data: any; } {
  throw new Error('Function not implemented.');
}

