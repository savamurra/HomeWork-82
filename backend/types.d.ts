export interface Artist {
    name: string;
    photo: string | null;
    info: string;
    _id: string;
}

export type ArtistWithoutId = Omit<Artist, '_id'>

export interface Album {
    title: string;
    artistId: string;
    releaseDate: string;
    image: string | null;
    _id: string;
}
export type AlbumWithoutId = Omit<Album, '_id'>;

export interface Track {
    title: string;
    albumId: string;
    duration: string;
    _id: string;
}

export type TrackWithoutId = Omit<Track, '_id'>;