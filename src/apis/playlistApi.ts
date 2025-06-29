import { AddItemToPlaylistRequest, AddItemToPlaylistResponse, CreatePlaylistRequest, GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistResponse, GetPlaylistItemsRequest, GetPlaylistItemsResponse, GetPlaylistRequest, Playlist } from "../models/playlist"
import api from "../utils/api"

export const getCurrentUserPlaylists = async({limit, offset}:
    GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
    try {
        const response = await api.get(`/me/playlists`,{
            params: {limit, offset}
        })
        return response.data;
    } catch (error) {
        console.error ("Failed to fetch current user playlists");
        throw error;
        
    }
}

export const getPlaylist = async (params: GetPlaylistRequest): Promise<Playlist> => {
    try {
        const response = await api.get(`/playlists/${params.playlist_id}`, {
            params,
        });
        return response.data;
     } catch(error) {
        console.error ("Failed to get playlist", error);
        throw error;
    }
};

export const getPlaylistItems = async (params: GetPlaylistItemsRequest): Promise<GetPlaylistItemsResponse> => {
    try {
        const response = await api.get (`/playlists/${params.playlist_id}/tracks`, {
            params,
        });
        return response.data;
    } catch(error) {
        console.error ("Failed to get playlist items", error);
        throw error;
    }
};

export const createPlaylist = async (
    user_id: string,
    params: CreatePlaylistRequest
    ): Promise<Playlist> => {
    try {
        const {name, playlist_public, collaborative, description} = params
        const response = await api.post(`/users/${user_id}/playlists`, {
            name,
            public: playlist_public,
            collaborative,
            description,
        });
        return response.data
    } catch (error) {
        console.error ("Failed to create playlist", error);
        throw error;
        //throw new Error ("Failed to create playlist");
    }
}

export const addItemToPlaylist = async (params: AddItemToPlaylistRequest): Promise<AddItemToPlaylistResponse> => {
    try {
        const { uris, position } = params;
        const response = await api.post(`/playlists/${params.playlist_id}/tracks`, {
            uris,
            position,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};