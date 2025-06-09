import React from 'react'
import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';

const PlaylistDetailPage = () => {
  const {id} = useParams< {id: string }>();
  if (id === undefined) return <Navigate to = "/" />;
  const {data} = useGetPlaylist({playlist_id : id });
  console.log("ddd", data);
  return <div>PlaylistDetailPage</div>;
};

export default PlaylistDetailPage;
