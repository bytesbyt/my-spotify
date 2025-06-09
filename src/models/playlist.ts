import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Image, Owner, Tracks } from "./commonType";

export interface GetCurrentUserPlaylistRequest {
    limit?: number,
    offset?: number,
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylistObject>;

export interface SimplifiedPlaylistObject {
    collaborative?: boolean;
    description?: string;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images: Image[];
    name?: string;
    owner?: Owner;
    public?: boolean;
    snapshot_id?: string;
    tracks?: Tracks;
    type?: string;
    uri?: string;
}