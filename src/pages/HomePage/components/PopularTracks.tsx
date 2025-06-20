import React from 'react'
import { Typography, Grid, Box, Skeleton} from '@mui/material';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';

import { POPULAR_TRACK_IDS } from '../../../configs/trackIds';
import useGetSeveralTracks from '../../../hooks/useGetSeveralTracks';

const PopularTracks = () => {
 const {data, error, isLoading} = useGetSeveralTracks(POPULAR_TRACK_IDS);

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

      {isLoading ? (
        <Grid container spacing = {{ xs: 0.5, sm:1}}>
          {Array.from(new Array(9)).map((_, index) => (
            <Grid size = {{xs:6, sm:4, md:2}} key={index}>
              <Box sx={{ padding: "12px" }}>
                <Skeleton animation= "wave" variant="rectangular" width="100%" height={0} sx={{ bgcolor: 'grey.900', paddingBottom: '100%', marginBottom: "8px" }} />
                <Skeleton animation= "wave" variant="text" sx={{ bgcolor: 'grey.900', fontSize: '1rem' }} />
                <Skeleton animation= "wave" variant="text" sx={{ bgcolor: 'grey.900', fontSize: '0.875rem' }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        data && data.tracks && data.tracks.length > 0 ? (
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
        )
      )}
    </div>
  );
};
export default PopularTracks;