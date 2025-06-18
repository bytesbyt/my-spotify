import { useTheme } from '@mui/material';
import { Box, Grid, styled, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/search';
import { useInView } from 'react-intersection-observer';
import AlbumsBox from './components/AlbumsBox';
import TrackList from './components/TrackList';
import ArtistsBox from './components/ArtistsBox';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import { motion } from 'framer-motion';


const SearchKeywordResultContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  height: "100dvh",
  overflow: "hidden",
  marginTop: "20px",
  borderRadius: "15px",
  maxWidth: "100%",
});

  const PlaylistlistContainer = styled(Box)({
  overflowY: "auto",
  background: "theme.palette.background.paper",
  scrollbarWidth: "none", 
  msOverflowStyle: "none", 
  "&::-webkit-scrollbar": {
    display: "none", 
  },
});

const SearchTrackListContainer = styled(Box)({
  backgroundColor: "#181818",
  padding: "6px",
  borderRadius: "8px",
  maxHeight: "400px",
  overflowY: "auto",
  pr: 1,
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});


const SearchWithKeywordPage = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { ref, inView } = useInView();

  const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemsByKeyword({
    q: keyword ?? "",
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
    limit: 6,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  console.log("SearchWithKeywordPage data:", data);

  const tracks = data?.pages.flatMap(page => page.tracks?.items ?? []) ?? [];
  const artists = data?.pages.flatMap(page => page.artists?.items ?? []) ?? [];
  const albums = data?.pages.flatMap(page => page.albums?.items ?? []) ?? [];
  const hasResult = tracks.length > 0 || artists.length > 0 || albums.length > 0;

  console.log("ssearchWithKeywordPage tracks:", tracks);
  console.log("searchWithKeywordPage artists:", artists);
  console.log("searchWithKeywordPage albums:", albums);


  const getContainerPadding = () => {
    if (isMobile) return 2;
    if (isTablet) return 3;
    return 5;
  };

  return (
    <SearchKeywordResultContainer p={getContainerPadding()}>
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
                <SearchTrackListContainer sx={{ maxHeight: "400px" }}>
                  <Box sx={{ width: "100%", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <AlbumsBox
                        image={tracks[0].album?.images?.[0]?.url || ""}
                        name={tracks[0].name || "Unknown"}
                        artistName={tracks[0].artists?.[0]?.name || "Unknown"}
                        style={{ maxWidth: "300px" }}
                      />
                    </motion.div>
                  </Box>
                </SearchTrackListContainer>
              ) : ""}
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
              {hasResult ? (
                <SearchTrackListContainer>
                  {tracks.map((track) => (
                    <TrackList key={track.id} track={track} />
                  ))}
                  <div ref={ref} style={{ height: '20px', marginTop: '20px' }}>
                    {isFetchingNextPage && <LoadingSpinner />}
                  </div>
                </SearchTrackListContainer>
              ) : (
                " "
              )}
            </Grid>
          </Grid>

          {/* Artists Section */}
          {hasResult && (
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
                
                {artists.slice(0, 6).map((artist) => {
                  const hasImages = 'images' in artist && Array.isArray(artist.images);
                  const images = hasImages ? (artist.images as { url: string }[]) : [];
                  return (
                    <ArtistsBox
                      key={artist.id}
                      image={images.length > 0 ? images[0].url : ''}
                      name={artist.name || ''}
                      artistName={"Artist"}
                    />
                  );
                })}
              </Box>
            </Box>
          )}

          {/* Albums Section */}
          {hasResult && (
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
                Albums
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
                {albums.slice(0, 6).map((album) => (
   
                    <AlbumsBox
                    key={album.id}
                    image={album.images?.[0]?.url || ''}
                    name={album.name || ''}
                    artistName={album.artists?.[0]?.name || ''}
                    />

                  
                ))}
              </Box>
            </Box>
          )}

      </PlaylistlistContainer>
    </ SearchKeywordResultContainer>
    






  )


}

export default SearchWithKeywordPage
