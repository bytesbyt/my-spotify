import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addItemToPlaylist } from '../apis/playlistApi';
import { AddItemToPlaylistRequest } from '../models/playlist';
import useGetCurrentUserProfile from './useGetCurrentUserProfile';


const useAddItemToPlaylist = () => {
    const queryClient = useQueryClient();
    const { data: user } = useGetCurrentUserProfile();

    return useMutation({
        mutationFn: (params: AddItemToPlaylistRequest) => {
            if (user) {
                return addItemToPlaylist(params);
            }
            return Promise.reject(new Error('user is not defined'));
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['playlist-detail', variables.playlist_id] });

            queryClient.invalidateQueries({
                queryKey: ['playlist-items'],
                exact: false,
            });

            queryClient.invalidateQueries({
                queryKey: ['current-user-playlists'],
                exact: false,
            });
        },
    });
};

export default useAddItemToPlaylist;
