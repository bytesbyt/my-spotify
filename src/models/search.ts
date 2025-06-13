import { SimplifiedAlbum } from "./albums";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ShowSimplified, SimplifiedAudiobook, SimplifiedEpisode, Track } from "./commonType";
import { SimplifiedPlaylistObject } from "./playlist";

export const enum SEARCH_TYPE {
    Album = "album", 
    Artist = "artist", 
    Playlist = "playlist", 
    Track = "track", 
    Show = "show", 
    Episode = "episode", 
    Audiobook = "audiobook",
}

export interface SearchRequestparams {
    q: string;
    type: SEARCH_TYPE[];
    market?: string;
    limit?: number;
    offset?: number;
    include_external?: "audio";
}

export interface SearchResponse {
    tracks?: ApiResponse<Track>;
    artists?: ApiResponse<Artist>;
    albums?: ApiResponse<SimplifiedAlbum>;
    playlists?: ApiResponse<SimplifiedPlaylistObject>;
    shows?: ApiResponse<ShowSimplified>;
    episodes?: ApiResponse<SimplifiedEpisode>;
    audiobooks?: ApiResponse<SimplifiedAudiobook>;
}