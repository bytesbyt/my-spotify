import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ExternalUrls, Image, Restriction, Track } from "./commonType";

export interface getNewReleasesResponse {
    albums: ApiResponse<SimplifiedAlbum>;
    };

export interface getSeveralTracksRequest {
    market?: string;
    ids: string;
}

export interface getSeveralTracksResponse {
    tracks: Track[];
}

export interface SimplifiedAlbum {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions?: Restriction;
    type: string;
    uri: string;
    artists: Artist[];
}