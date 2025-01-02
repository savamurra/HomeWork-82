export interface Artist {
    name: string;
    photo: string | null;
    info: string;
    id: string;
}

export type ArtistWithoutId = Omit<Artist, 'id'>

export interface Album {
    title: string;
    artistId: string;
    releaseDate: string;
    image: string;
    id: string;
}
export type AlbumWithoutId = Omit<Album, 'id'>;

export interface Track {
    title: string;
    albumId: string;
    duration: string;
    id: string;
}

export type TrackWithoutId = Omit<Track, 'id'>;