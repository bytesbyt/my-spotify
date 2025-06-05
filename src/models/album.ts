import { Artists } from "./artists";
import { ExternalUrls, Images, Restrictions } from "./commonType";

export interface getNewReleasesResponse {
    album: {
        href: string;
        limit: number;
        next: string;
        offset: number;
        previous: string | null;
        total: number;
        items: {
            album_type: string;
            total_tracks: number;
            available_markets: string[];
            external_urls: ExternalUrls;
            href: string;
            id: string;
            images: Images[];
            name: string;
            release_date: string;
            release_date_precision: string;
            restrictions?: Restrictions;
            type: string;
            uri: string;
            artists: Artists[];
        }[];
    };

}