import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreatePlaylistRequest } from "../models/playlist"
import { createPlaylist } from "../apis/playlistApi"
import useGetCurrentUserProfile from "./useGetCurrentUserProfile"

const useCreatePlaylist = () => {
    const queryClient = useQueryClient();
    const { data:user } = useGetCurrentUserProfile ();
    return useMutation({
        mutationFn: (params: CreatePlaylistRequest) => {
            if (user) {
                return createPlaylist(user.id, params);
            }
            return Promise.reject(new Error("User is not defined"));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
            console.log("Success!");
        },
    });
};

export default useCreatePlaylist;