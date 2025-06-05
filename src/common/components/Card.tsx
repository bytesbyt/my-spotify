import { styled, Typography } from '@mui/material'
import React from 'react'

const CardContainer = styled("div")(({theme}) => ({
  minWidth: "160px",
  width: "100%",
  height: "100%",
  padding: "12px",
  borderRadius: "8px",
  "&:hover": {
    backgroundCOlor: theme.palette.action.hover,
    transform: "translate3d(0px, 0px, 0px)",
    transition: "opacity 0.3x ease-in-out",
  },
  "&:hover .overlay": {
    opacity: 1,
  },

}));

const AlbumImage = styled("img")({
  width: "100%",
  height: "auto",
  borderRadius: "8px",
  marginBottom: "8px",
})

interface CardProps {
    name: string;
    image: string;
    artistName: string | undefined;
}



const Card = ({image, name, artistName}: CardProps) => {
  return (
    <CardContainer>
      <div style = {{ position: "relative" }}>
        <AlbumImage src= {image}/>
      </div>

      <Typography>{name}</Typography>
      <Typography>{artistName}</Typography>
    </CardContainer>

  );
};

export default Card;
