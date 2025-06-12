import { ApiResponse } from "./apiResponse";
import { Episode, ExternalUrls, Image, Owner, Track, Tracks } from "./commonType";

export interface GetCurrentUserPlaylistRequest {
    limit?: number,
    offset?: number,
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylistObject>;

export interface BasePlaylist {
    collaborative?: boolean;
    description?: string | null;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images: Image[];
    name?: string;
    owner?: Owner;
    public?: boolean;
    snapshot_id?: string;
    type?: "playlist";
    uri?: string;
}
export interface SimplifiedPlaylistObject extends BasePlaylist{
    tracks?: Tracks;
}

export interface Playlist extends BasePlaylist {
    tracks?: ApiResponse<PlaylistTrack>;
}

export interface PlaylistTrack {
    added_at?: string | null;
    added_by?: {
        external_urls?: ExternalUrls;
        href?: string;
        id?: string;
        type?: string;
        uri?: string;
    } | null;
    is_local?: boolean;
    track: Track | Episode;
}

export interface GetPlaylistRequest {
    playlist_id?: string;
    market?: string;
    fields?: string;
    additional_types?: string;
}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
    offset?: number;
    limit?: number;
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>

export interface CreatePlaylistRequest {
    name: string;
    playlist_public?: boolean;
    collaborative?: boolean;
    description?: string;
}