import { useQuery } from "@tanstack/react-query"
import { GetCurrentUserPlaylistRequest } from "../models/playlist";
import { getCurrentUserPlaylists } from "../apis/playlistAPi";

const useGetCurrentUserPlaylists = ({limit, offset}: GetCurrentUserPlaylistRequest) => {

    return useQuery({
        queryKey: ["current-user-playlists", limit, offset],
        queryFn:() => {
            return getCurrentUserPlaylists({limit, offset})
        }
    });
};

export default useGetCurrentUserPlaylists;