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
}
export type AlbumWithoutId = Omit<Album, '_id'>;

export interface Track {
    title: string;
    album: string;
    duration: number;
    _id: string;
    numberOfTracks: number;
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