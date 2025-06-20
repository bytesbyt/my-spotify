import React from 'react'
import { Typography, Grid, Box, Skeleton} from '@mui/material';
import useGetNewReleases from '../../../hooks/useGetNewReleases';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';

const NewReleases = () => {
  const {data, error, isLoading} = useGetNewReleases();

  if(error){
    return <ErrorMessage errorMessage={error.message}/>
  }
  
  return (
    <div>
      <Box display="flex" padding="24px 0">
        <Typography variant = "h1" paddingLeft={1}>
        New Released Albums
        </Typography>
      </Box>

      {isLoading ? (
        <Grid container spacing = {{ xs: 0.5, sm:1}}>
          {Array.from(new Array(6)).map((_, index) => (
            <Grid size = {{xs:6, sm:4, md:2}} key={index}>
              <Box sx={{ padding: "12px" }}>
                <Skeleton animation= "wave" variant="rectangular" width="100%" sx={{ bgcolor: 'grey.900', paddingBottom: '100%', marginBottom: "8px" }}/>
                <Skeleton animation= "wave" variant="text" sx={{ bgcolor: 'grey.900', fontSize: '1rem' }} />
                <Skeleton animation= "wave" variant="text" sx={{ bgcolor: 'grey.900', fontSize: '0.875rem' }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        data && data.albums.items.length > 0 ? (
          <Grid container spacing = {{ xs: 0.5, sm:1}}>
            {data.albums.items.map((album) => (
              <Grid size = {{xs:6, sm:4, md:2}} key = {album.id}>
                <Card
                  image = {album.images[0].url}
                  name = {album.name}
                  artistName = {album.artists[0].name}
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
export default NewReleases;