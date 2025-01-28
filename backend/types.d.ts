export interface IArtist {
    name: string;
    photo: string | null;
    info: string;
    _id: string;
    isPublished: boolean;
}

export type ArtistWithoutId = Omit<IArtist, '_id'>

export interface IAlbum {
    title: string;
    artist: string;
    releaseDate: number;
    image: string | null;
    _id: string;
    trackCount: number;
    isPublished: boolean;
}
export type AlbumWithoutId = Omit<IAlbum, '_id'>;

export interface ITrack {
    title: string;
    album: string;
    duration: number;
    _id: string;
    numberOfTracks: number;
    youtubeLink: string;
    isPublished: boolean;
}

export type TrackWithoutId = Omit<ITrack, '_id'>;

export interface UserFields {
    username: string;
    password: string;
    token: string;
    role: string;
    isPublished: boolean;
}
