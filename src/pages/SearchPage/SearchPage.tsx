import React, { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import useGetCategories from '../../hooks/useGetCategories';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import ErrorMessage from '../../common/components/ErrorMessage';
import { useInView } from 'react-intersection-observer';

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const SearchPage = () => {
  const scrollContainerRef = useRef(null);
  const { ref, inView } = useInView();

  const { 
    data: categoriesData, 
    isLoading, 
    error, 
    hasNextPage, 
    isFetchingNextPage, 
    fetchNextPage 
  } = useGetCategories();

  console.log("categoriesData:", categoriesData);

  useEffect(() => {
    // console.log('Scroll Status:', {
    //   inView,
    //   hasNextPage,
    //   isFetchingNextPage,
    //   currentItems: categoriesData?.pages.flatMap(page => page.categories.items).length || 0
    // });

    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log('Fetching next page...');
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, categoriesData]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  //console.log('Categories Data:', categoriesData);

  const allCategories = categoriesData?.pages.flatMap(page => page.categories.items) || [];

  //console.log('All Categories:', allCategories);

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }} ref={scrollContainerRef}>
      <Box sx={{ mb: { xs: 2, sm: 3, md: 6 } }} />
      <Typography 
        variant="h1" 
        sx={{ 
          mb: { xs: 2, sm: 3, md: 4 },
          fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'  },
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: '#fff',
        }}
      >
        Browse All
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 2fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
            xl: 'repeat(5, 1fr)',
          },
          gap: { xs: 1.5, sm: 1.5, md: 2, lg: 2.5, xl: 3 },
        }}
      >
        {allCategories.map((category, index) => (
          <Box
            key={category.id}
            sx={{
              position: 'relative',
              paddingTop: '60%',
              borderRadius: { xs: 5, sm: 6, md: 8 },
              overflow: 'hidden',
              backgroundColor: generateRandomColor(),
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              border: '2px solid transparent',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                border: '1.5px solid rgba(255, 255, 255, 0.8)',
                '& .category-name': {
                  transform: 'translateY(-4px)',
                },
              },
            }}
          >
            <Box
              className="category-icon"
              component="img"
              src={category.icons[0].url}
              alt={category.name}
              sx={{
                position: 'absolute',
                top: '15%',
                right: '15%',
                transform: 'translate(50%, -50%) rotate(45deg)',
                width: '70%',
                height: '70%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                opacity: 0.9,
                transformOrigin: 'center',
              }}
            />
            <Typography
              className="category-name"
              variant="h6"
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: { xs: 1.5, sm: 2 },
                color: 'white',
                fontWeight: 700,
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                textAlign: 'center',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                letterSpacing: '0.02em',
              }}
            >
              {category.name}
            </Typography>
          </Box>
        ))}
      </Box>
      <div ref={ref} style={{ height: '20px', marginTop: '20px' }}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </Box>
  );
};

export default SearchPage;
