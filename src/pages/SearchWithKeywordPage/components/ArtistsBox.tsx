import { styled, Typography } from '@mui/material';
import React from 'react';

import PlayButton from '../../../common/components/PlayButton';
const CardContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
  minWidth: '160px',
  padding: '12px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translate3d(0px,0px,0px)',
    transition: 'opacity 0.3s ease-in-out',
  },
  '&:hover .overlay': {
    opacity: 1,
  },
}));

const ArtistImage = styled('img')({
  width: '100%',
  aspectRatio: 1,
  borderRadius: '50%',
  marginBottom: '8px',
  padding: "5px",
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },

});

const EllipsisTypography = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const Overlay = styled('div')({
  position: 'absolute',
  bottom: '20px',
  right: '8px',
  opacity: 0,
  transform: 'translate3d(0px,0px,0px)',
  transition: 'opacity 0.3s ease-in-out',
});
interface CardProps {
  name: string;
  image: string;
  artistName: string | undefined;
}

const ArtistCard = ({ image, name, artistName }: CardProps) => {
  return (
    <CardContainer>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <ArtistImage src={image} alt="artist-img" />
        <Overlay className="overlay">
          <PlayButton />
        </Overlay>
      </div>
      <div>
        <EllipsisTypography variant="h2" marginBottom="4px">
          {name || 'No name'}
        </EllipsisTypography>
        <EllipsisTypography variant="body1" color="text.secondary">
          {artistName || 'No artist'}
        </EllipsisTypography>
      </div>
    </CardContainer>
  );
};

export default ArtistCard;
