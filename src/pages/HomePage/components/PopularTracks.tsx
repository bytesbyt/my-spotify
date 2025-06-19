import React from 'react'
import { Typography, Grid, styled, Box} from '@mui/material';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';

import { POPULAR_TRACK_IDS } from '../../../configs/trackIds';
import useGetSeveralTracks from '../../../hooks/useGetSeveralTracks';

const PopularTracks = () => {
  const {data, error, isLoading} = useGetSeveralTracks(POPULAR_TRACK_IDS);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if(error){
    return <ErrorMessage errorMessage={error.message}/>
  }

  console.log("several tracks", data);

  return (
    <div>
      <Box display="flex" padding="24px 0">
        <Typography variant = "h1" paddingLeft={1}>
          Popular Tracks
        </Typography>
      </Box>

      {data && data.tracks && data.tracks.length > 0 ? (
        <Grid container spacing = {{ xs: 0.5, sm:1}}>
          {data.tracks.map((track) => (
            <Grid size = {{xs:6, sm:4, md:2}} key = {track.id}>
              <Card
                image = {track.album?.images?.[0]?.url || ''}
                name = {track.name || ''}
                artistName = {track.artists?.[0]?.name || ''}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant = "h2">No Data</Typography>
      )}
    </div>
  );
};
export default PopularTracks;