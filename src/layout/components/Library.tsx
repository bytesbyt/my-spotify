import React from 'react'
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import ErrorMessage from '../../common/components/ErrorMessage';
import { Button, Card, styled, Typography } from '@mui/material';
import Playlist from './Playlist';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
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
  const {
    data,
    isLoading,
    error,
  } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });
 
  
  const { data: user } = useGetCurrentUserProfile();
  if (!user) return <EmptyPlaylist />;
   console.log("ddd", data);
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  
  return (
    <div>
      {!data ||data?.pages[0].total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
          {data?.pages.map((page, index) => (
            <Playlist playlists={data.pages[0].items} key = {index}/>
          ))}

        </PlaylistContainer>
      )}
    </div>
  );
};

export default Library;


function userGetCurrentUserProfile(): { data: any; } {
  throw new Error('Function not implemented.');
}

