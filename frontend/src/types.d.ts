export interface Artist {
    name: string;
    photo: File | null;
    info: string;
    _id: string;
    user: string,
    isPublished: boolean;
}

export interface ArtistMutation {
    name: string;
    photo: File | null;
    info: string;
    user: string,
}

export interface Album {
    title: string;
    artist: string;
    releaseDate: number;
    image: string | null;
    _id: string;
    trackCount: number;
    isPublished: boolean;
    user: string;
}

export interface AlbumMutation {
    title: string;
    artist: string;
    image: File | null;
    releaseDate: string;
    user: string;
}


export interface AlbumResponse {
    results: Album[];
    artist: Artist;
}

export interface Track {
    title: string;
    album: string;
    duration: number;
    _id: string;
    numberOfTracks: number;
    youtubeLink: string;
    isPublished: boolean;
    user: string;
}

export interface TrackMutation {
    title: string;
    album: string;
    artist: string;
    duration: number;
    numberOfTracks: number;
    youtubeLink: string;
}

export interface TrackResponse {
    results: Track[];
    album: Album;
    artist: Artist;
}

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
    role: string;
}

export interface TrackHistoryFields {
    user: string;
    artist: {
        name: string;
        photo: string;
    };
    track: {
        title: string
    };
    datetime: string
}

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