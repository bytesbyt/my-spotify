import React from 'react'
import { Track } from '../../../models/commonType';
import { Typography } from '@mui/material';
interface SearchResultListProps{
    list: Track[];
}
const SearchResultList = ({list}: SearchResultListProps ) => {
  return (
    <div>
      {list.map((track)=> <Typography variant = "h2">{track.name}</Typography>)}
    </div>
  )
}

export default SearchResultList
