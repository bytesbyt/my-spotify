import React from 'react'
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import ErrorMessage from '../../common/components/ErrorMessage';
import { styled } from '@mui/material';
import Playlist from './Playlist';

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  height: "100%"
}))

const Library = () => {
  const {
    data,
    isLoading,
    error,
  } = useGetCurrentUserPlaylists ({limit: 10, offset:0});

  if (isLoading) {
    return <LoadingSpinner />;
  }
  else if (error) {
    return <ErrorMessage errorMessage = {error.message} />;
  }
  return (
    <div>
      {!data || data?.total === 0? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
            {/* <Playlist key = {pageIndex} playlists = {data.items} /> */}
        </PlaylistContainer>
      )}
    </div>

  );
};

export default Library;


