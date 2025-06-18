import { styled, Typography, useTheme, useMediaQuery } from "@mui/material";
import React from "react";

import PlayButton from "../../../common/components/PlayButton";

const CardContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  minWidth: "120px",
  padding: "8px",
  borderRadius: "8px",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "scale(1.03)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  },
  "&:hover .overlay": {
    opacity: 1,
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: "100px",
    padding: "6px",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  [theme.breakpoints.down('xs')]: {
    minWidth: "80px",
    padding: "4px",
    "&:hover": {
      transform: "scale(1.01)",
    },
  },
}));

const AlbumImage = styled("img")(({ theme }) => ({
  width: "100%",
  aspectRatio: 1,
  borderRadius: "8px",
  marginBottom: "6px",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: "4px",
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
  [theme.breakpoints.down('xs')]: {
    marginBottom: "3px",
    "&:hover": {
      transform: "translateY(-1px)",
    },
  },
}));

const EllipsisTypography = styled(Typography)(({ theme }) => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontSize: "0.875rem",
  [theme.breakpoints.down('sm')]: {
    fontSize: "0.75rem",
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: "0.7rem",
  },
}));

const Overlay = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: "16px",
  right: "6px",
  opacity: 0,
  transform: "translate3d(0px,0px,0px)",
  transition: "opacity 0.3s ease-in-out",
  [theme.breakpoints.down('sm')]: {
    bottom: "12px",
    right: "4px",
  },
  [theme.breakpoints.down('xs')]: {
    bottom: "8px",
    right: "2px",
  },
}));

interface CardProps {
  name: string;
  image: string;
  artistName: string | undefined;
  style?: React.CSSProperties;
}

const Card = ({ image, name, artistName, style }: CardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <CardContainer style={style}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <AlbumImage src={image} alt="album-img" />
        <Overlay className="overlay">
          <PlayButton />
        </Overlay>
      </div>
      <div>
        <EllipsisTypography 
          variant={isSmallMobile ? "body2" : isMobile ? "body1" : "h2"} 
          marginBottom="2px"
        >
          {name || "No name"}
        </EllipsisTypography>
        <EllipsisTypography 
          variant={isSmallMobile ? "caption" : "body2"} 
          color="text.secondary"
        >
          {artistName || "No artist"}
        </EllipsisTypography>
      </div>
    </CardContainer>
  );
};

export default Card;