import React from 'react'
import { Typography, Grid, styled, Box} from '@mui/material';
import useGetNewReleases from '../../../hooks/useGetNewReleases';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';

const NewReleases = () => {
  const {data, error, isLoading} = useGetNewReleases();

  if (isLoading) {
    return <LoadingSpinner />;
  }
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


      {data && data.albums.items.length > 0 ? (
        <Grid container spacing = {{ xs: 0.5, sm:1}}>
          {data.albums.items.map((album) => (
            <Grid size = {{xs:6, sm:6, md:2}} key = {album.id}>
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
      )}
    </div>
  );
};
export default NewReleases;