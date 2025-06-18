import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultList from './SearchResultList';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlineSharpIcon from '@mui/icons-material/InfoOutlineSharp';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import { useInView } from 'react-intersection-observer';

const EmptyPlaylistWithSearch = () => {
  const { ref, inView } = useInView();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [keyword, setKeyword] = useState<string>('');

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album],
    limit: 20,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log('Loading...');
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const allTracks = data?.pages.flatMap(page => page.tracks?.items ?? []) ?? [];
  const hasResult = allTracks.length > 0;

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box
        sx={{
          padding: {
            xs: '0.5rem',
            sm: '1rem',
          },
          width: '100%',
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="h2"
          sx={{
            fontWeight: 'bold',
            flexShrink: 0,
            mb: 2,
            px: { xs: 1, sm: 0 },
          }}
        >
          What do you want to listen to today?
        </Typography>

        <TextField
          value={keyword}
          onChange={handleSearchKeyword}
          variant="outlined"
          placeholder="Search for artists or songs..."
          fullWidth
          sx={{
            maxWidth: {
              xs: '100%',
              sm: '420px',
            },
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1ed760',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: 'white' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ 
        width: '100%',
        height: 'calc(100% - 120px)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <LoadingSpinner />
          </Box>
        ) : keyword === '' ? (
          <></>
        ) : data && hasResult ? (
          <>
            <SearchResultList list={allTracks} />
            <div ref={ref} style={{ height: '20px', marginTop: '20px' }}>
              {isFetchingNextPage && <LoadingSpinner />}
            </div>
          </>
        ) : (
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center"
            sx={{
              py: { xs: 4, sm: 8 },
              px: { xs: 2, sm: 4 },
            }}
          >
            <InfoOutlineSharpIcon
              sx={{
                fontSize: { xs: 40, sm: 60 },
                mb: 2,
                color: '#1ed760',
              }}
            />
            <Typography
              variant={isMobile ? "h4" : "h1"}
              fontWeight={800}
              mb="10px"
              color="text.secondary"
              textAlign="center"
            >
              {`'${keyword}' No Search Result Found`}
            </Typography>
            <Typography 
              variant={isMobile ? "h6" : "h2"}
              textAlign="center"
            >
              Please try different keyword
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EmptyPlaylistWithSearch;
