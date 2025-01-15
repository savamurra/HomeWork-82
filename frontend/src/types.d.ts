export interface Artist {
    name: string;
    photo: string | null;
    info: string;
    _id: string;
}

export type ArtistWithoutId = Omit<Artist, '_id'>

export interface Album {
    title: string;
    artist: string;
    releaseDate: number;
    image: string | null;
    _id: string;
    trackCount: number;
}

export interface AlbumResponse {
    results: Album[];
    artist: Artist;
}

export type AlbumWithoutId = Omit<Album, '_id'>;

export interface Track {
    title: string;
    album: string;
    duration: number;
    _id: string;
    numberOfTracks: number;
}

export interface TrackResponse {
    results: Track[];
    album: Album;
    artist: Artist;
}

export type TrackWithoutId = Omit<Track, '_id'>;

