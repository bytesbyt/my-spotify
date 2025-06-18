import React, { useState } from 'react';
import { TextField, InputAdornment, useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

interface SearchbarProps {
  onSelect: (keyword: string) => void;
}

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

const SearchBar: React.FC<SearchbarProps> = ({onSelect}) => {
  const [keyword, setKeyword] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // const handleSearch = () => {
  //   const trimmedValue = keyword.trim();
  //   if (trimmedValue) {
  //     navigate(`/search/${encodeURIComponent(trimmedValue)}`);
  //   } else {
  //     navigate('/search');
  //   }
  // };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter') {
      const value = keyword.trim();
      if (value) {
        onSelect(value);
      }
    }
  };

  return (
    <StyledTextField
      placeholder={isMobile ? "Search" : "What do you want to listen to?"}
      value={keyword}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      //onBlur={handleSearch}
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