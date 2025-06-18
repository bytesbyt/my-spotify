import { styled, Typography } from "@mui/material";
import React from "react";

import PlayButton from "../../../common/components/PlayButton";
const CardContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  minWidth: "160px",
  padding: "12px",
  borderRadius: "8px",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "scale(1.05)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));

const AlbumImage = styled("img")({
  width: "100%",
  aspectRatio: 1,
  borderRadius: "8px",
  marginBottom: "8px",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
});

const EllipsisTypography = styled(Typography)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const Overlay = styled("div")({
  position: "absolute",
  bottom: "20px",
  right: "8px",
  opacity: 0,
  transform: "translate3d(0px,0px,0px)",
  transition: "opacity 0.3s ease-in-out",
});
interface CardProps {
  name: string;
  image: string;
  artistName: string | undefined;
  style?: React.CSSProperties;
}

const Card = ({ image, name, artistName, style }: CardProps) => {
  return (
    <CardContainer style={style}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <AlbumImage src={image} alt="album-img" />
        <Overlay className="overlay">
          <PlayButton />
        </Overlay>
      </div>
      <div>
        <EllipsisTypography variant="h2" marginBottom="4px">
          {name || "No name"}
        </EllipsisTypography>
        <EllipsisTypography variant="body1" color="text.secondary">
          {artistName || "No artist"}
        </EllipsisTypography>
      </div>
    </CardContainer>
  );
};

export default Card;