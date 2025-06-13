
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