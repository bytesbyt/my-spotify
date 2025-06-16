import { InputAdornment, TextField, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

const SearchBar = () => {
  const theme = useTheme();
  const isMobile = useTheme().breakpoints.down('sm');

  return (
    <TextField
      variant="outlined"
      placeholder="Serach..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'text.secondary' }} />
          </InputAdornment>
        ),
      }}
      sx={{
        maxWidth: '500px',
        width: '100%',
        '& .MuiOutlinedInput-root': {
          borderRadius: 10,
          backgroundColor: 'theme.background.paper',
          transition: 'all 0.3s ease-in-out',
          '&: hover': {
            backgroundColor: theme.palette.action.hover,
          },
          '& fieldset': {
            borderColor: theme.palette.action.active,
          },
        },
        '& .MuiInputBase-input': {
          color: theme.palette.text.primary,
          fontSize: isMobile ? '1rem' : '1.25rem',
          py: isMobile ? 1.5 : 2,
        },
        '& .MuiInputAdornmnet-root': {
          marginRight: 1,
        },
      }}
    />
  );
};

export default SearchBar;
