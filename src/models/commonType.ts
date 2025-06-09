import { SimplifiedAlbum } from "./albums";
import { Artist } from "./artist";

export interface ExternalUrls {
    spotify?: string;
}

export interface Image {
    url: string;
    height: number | null;
    width: number | null;
}

export interface Restriction {
    reason?: string;
}

export interface Followers {
    href?: string | null;
    total: number;
}

export interface ExplicitContent {
    filter_enabled?: boolean;
    filter_locked?: boolean;
}

export interface Owner{
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
    display_name?: string | null;
}

export interface Tracks{
    href?: string;
    total?: number;
}

interface LinkedTrack {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  type?: string;
  uri?: string;
}

export interface Track {
    album?: SimplifiedAlbum;
    artists?: Artist[];
    available_markets?: string[];
    disc_number?: number;
    duration_ms?: number;
    explicit?: boolean;
    external_ids?: {
        isrc?: string;
        ean?: string;
        upc?: string;
    }
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    is_playable?: boolean;
    linked_from?: LinkedTrack;
    restrictions?: Restriction;
    name?: string;
    popularity?: number;
    preview_url?: string | null;
    track_number?: number;
    type?: "track";
    uri?: string;
    is_local?: boolean;
}

export interface Episode {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language?: string; 
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  resume_point?: {
    fully_played?: boolean;
    resume_position_ms?: number;
  }
  type: "episode";
  uri: string;
  restrictions?: Restriction;
  show: ShowSimplified;
}

interface ShowSimplified {
  available_markets: string[];
  copyrights: {
    text?: string;
    type?: string;
  }[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: "show";
  uri: string;
  total_episodes: number;
}