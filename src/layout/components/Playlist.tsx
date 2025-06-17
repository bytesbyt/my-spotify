import React from "react";
import PlaylistItem from "../../common/components/PlaylistItem";
import { SimplifiedPlaylistObject } from "../../models/playlist";
import { useLocation, useNavigate } from "react-router";

interface PlaylistProps {
  playlists: SimplifiedPlaylistObject[];
}

const Playlist = ({ playlists }: PlaylistProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  //console.log("playlists:", playlists);
  //console.log("Location:", location);


  const handleItemClick = (id: string) => {

    navigate(`/playlist/${id}`);
  };
  return (
    <div>
      {playlists.map((item) => (
        <PlaylistItem
          selected={location.pathname === `/playlist/${item.id}`}
          handleClick={handleItemClick}
          name={item.name || ""}
          image={(item.images && item.images[0]?.url) || null}
          id={item.id || ""}
          key={item.id}
          artistName={"Playlist •" + item.owner?.display_name}
        />
      ))}
    </div>
  );
};

export default Playlist;

