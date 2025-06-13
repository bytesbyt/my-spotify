import { TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { SEARCH_TYPE } from '../../../models/search';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import SearchResultList from './SearchResultList';

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>('');
  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album],
  });

  

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div>
      <Typography variant="h1" my="10px">
        Let's find something for your playlist
      </Typography>
      <TextField value={keyword} onChange={handleSearchKeyword} />
      {data?.pages.map((item) => {
        if(!item.tracks) return false;
        return <SearchResultList list={item.tracks?.items} />
      }
      )}
    </div>
  );
};

export default EmptyPlaylistWithSearch;
