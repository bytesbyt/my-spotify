import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultList from './SearchResultList';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlineSharpIcon from '@mui/icons-material/InfoOutlineSharp';
import LoadingSpinner from '../../../common/components/LoadingSpinner';

const EmptyPlaylistWithSearch = () => {
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
  });

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const tracks = data?.pages[0]?.tracks?.items ?? [];
  const hasResult = tracks.length > 0;

  return (
    <div>
      <Typography variant="h1" mt="50px" mb="30px">
        What do you want to listen to?
      </Typography>

      <TextField
        value={keyword}
        onChange={handleSearchKeyword}
        placeholder="Search"
        style={{
          width: '500px',
          marginBottom: '23px',
          backgroundColor: '#282828',
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: 'white' }} />
            </InputAdornment>
          ),
        }}
      />
      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : keyword === '' ? (
          <></>
        ) : data && hasResult ? (
          data.pages.map((item, idx) => {
            if (!item.tracks) return null;
            return (
              <SearchResultList
                key={idx}
                list={item.tracks.items}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
              />
            );
          })
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center">
            <InfoOutlineSharpIcon
              style={{
                fontSize: 60,
                marginBottom: '15px',
                color: '#1ed760',
                
              }}
            />
            <Typography
              variant="h1"
              fontWeight={800}
              mb="10px"
              color="text.secondary"
            >
              {`'${keyword}' No Search Result Found`}
            </Typography>
            <Typography variant="h2">Please try different keyword</Typography>
          </Box>
        )}
      </div>
    </div>
  );
};

export default EmptyPlaylistWithSearch;
