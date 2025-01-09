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
    releaseDate: string;
    image: string | null;
    _id: string;
}
export type AlbumWithoutId = Omit<Album, '_id'>;

export interface Track {
    title: string;
    album: string;
    duration: string;
    _id: string;
}

export type TrackWithoutId = Omit<Track, '_id'>;

export interface UserFields {
    username: string;
    password: string;
    token: string;
}

export interface TrackHistoryFields {
    user: string;
    track: string;
    datetime: string
}