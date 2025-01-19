export interface IArtist {
    name: string;
    photo: string | null;
    info: string;
    _id: string;
}

export type ArtistWithoutId = Omit<IArtist, '_id'>

export interface IAlbum {
    title: string;
    artist: string;
    releaseDate: number;
    image: string | null;
    _id: string;
    trackCount: number;
}
export type AlbumWithoutId = Omit<IAlbum, '_id'>;

export interface ITrack {
    title: string;
    album: string;
    duration: number;
    _id: string;
    numberOfTracks: number;
    youtubeLink: string;
}

export type TrackWithoutId = Omit<ITrack, '_id'>;

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