import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { TextField, InputAdornment, useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: 'white',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.7)',
      opacity: 1,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  width: '100%',
}));

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearch = () => {
    const trimmedValue = keyword.trim();
    if (trimmedValue) {
      navigate(`/search/${encodeURIComponent(trimmedValue)}`);
    } else {
      navigate('/search');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <StyledTextField
      placeholder={isMobile ? "Search" : "What do you want to listen to?"}
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      onKeyPress={handleKeyPress}
      onBlur={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiInputBase-input': {
          fontSize: isMobile ? '0.9rem' : '1rem',
          py: isMobile ? 1 : 1.5,
        },
      }}
    />
  );
};

export default SearchBar; 