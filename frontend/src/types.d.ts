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



export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface TrackHistoryFields {
    user: string;
    track: string;
    datetime: string
}

export type TrackHistoryWithoutDateTime = Omit<TrackHistoryFields, 'datetime'>;

export interface RegisterResponse {
    user: User;
    message: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}