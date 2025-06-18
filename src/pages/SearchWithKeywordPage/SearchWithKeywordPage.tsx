import { useTheme } from '@mui/material';
import { Box, Grid, styled, Typography, useMediaQuery } from '@mui/material';
import React, { use } from 'react';
import { useParams } from 'react-router';
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/search';
import { useInView } from 'react-intersection-observer';
import AlbumsBox from './components/AlbumsBox';
import TrackList from './components/TrackList';
import ArtistsBox from './components/ArtistsBox';

const SearchKeywordResultContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: '100dvh',
  overflow: 'hidden',
  marginTop: '20px',
  borderRadius: '15px',
  maxWidth: '100%',
});

const PlaylistlistContainer = styled(Box)({
  overflowY: 'auto',
  background: 'theme.palette.background.paper',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const SearchTrackListContainer = styled(Box)({
  backgroundColor: '#181818',
  padding: '8px',
  borderRadius: '8px',
  maxHeight: '270px',
  overflowY: 'auto',
  pr: 1,
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const SearchWithKeywordPage = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const theme = useTheme();

  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: keyword ?? '',
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
    limit: 20,
  });

  console.log('SearchWithKeywordPage data:', data);

  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];
  const artists =
    data?.pages.flatMap((page) => page.artists?.items ?? []) ?? [];
  const albums = data?.pages.flatMap((page) => page.albums?.items ?? []) ?? [];
  const hasResult =
    tracks.length > 0 || artists.length > 0 || albums.length > 0;

  console.log('ssearchWithKeywordPage tracks:', tracks);
  console.log('searchWithKeywordPage artists:', artists);
  console.log('searchWithKeywordPage albums:', albums);

  return (
    <SearchKeywordResultContainer p={5}>
      <PlaylistlistContainer>
        <Grid container spacing={2} mb={5}>
          <Grid size={{ xs: 12, md: 4 }}>
            {tracks.length > 0 && (
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  mb: 2,
                  color: 'white',
                  textAlign: 'left',
                }}
              >
                Trending
              </Typography>
            )}

            {tracks[0] ? (
              <SearchTrackListContainer>
                <Box sx={{ width: '195px' }}>
                  <AlbumsBox
                    image={tracks[0].album?.images?.[0]?.url || ''}
                    name={tracks[0].name || 'Unknown'}
                    artistName={tracks[0].artists?.[0]?.name || 'Unknown'}
                  />
                </Box>
              </SearchTrackListContainer>
            ) : (
              ''
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            {tracks.length > 0 && (
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  mb: 2,
                  color: 'white',
                  textAlign: 'left',
                }}
              >
                Songs
              </Typography>
            )}
            {tracks.length > 0 ? (
              <SearchTrackListContainer>
                {tracks.map((track) => (
                  <TrackList key={track.id} track={track} />
                ))}
              </SearchTrackListContainer>
            ) : (
              ' '
            )}
          </Grid>
        </Grid>

        {/* Artists Section */}
        {artists.length > 0 && (
          <Box sx={{ width: '100%', mt: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.5rem', sm: '2rem' },
                mb: 2,
                color: 'white',
                textAlign: 'left',
              }}
            >
              Artists
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(4, 1fr)',
                  lg: 'repeat(5, 1fr)',
                  xl: 'repeat(6, 1fr)',
                },
                gap: { xs: 2, sm: 3, md: 4 },
                overflowX: { xs: 'auto', sm: 'visible' },
                pb: 2,
              }}
            >
              {artists.slice(0, 6).map((artist) => (
                <ArtistsBox
                  key={artist.id}
                  image={
                    artist.images && artist.images[0] && artist.images[0].url
                      ? artist.images[0].url
                      : ''
                  }
                  name={artist.name || ''}
                  artistName={'Artist'}
                />
              ))}
            </Box>
          </Box>
        )}
      </PlaylistlistContainer>
    </SearchKeywordResultContainer>
  );
};

export default SearchWithKeywordPage;
