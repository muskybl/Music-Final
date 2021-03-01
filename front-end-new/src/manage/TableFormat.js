
const AlbumHeadCells = [
    { id: 'album_id', numeric: false, disablePadding: true, label: 'album_id' },
    { id: 'title', numeric: false, disablePadding: false, label: 'title' },
    { id: 'cover', numeric: false, disablePadding: false, label: 'cover' },
    { id: 'releaseDate', numeric: false, disablePadding: false, label: 'releaseDate' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'createdAt' },
    { id: 'premium', numeric: true, disablePadding: false, label: 'premium' },
];
const AlbumsObj = { id: 'album_id', order: ['album_id', 'title', 'cover', 'releaseDate', 'createdAt', 'premium'] }

const PlaylistHeadCells = [
    { id: 'playlist_id', numeric: false, disablePadding: true, label: 'playlist_id' },
    { id: 'title', numeric: false, disablePadding: false, label: 'title' },
    { id: 'cover', numeric: false, disablePadding: false, label: 'cover' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'createdAt' },
    { id: 'private', numeric: false, disablePadding: false, label: 'private' },
    { id: 'account_id', numeric: false, disablePadding: false, label: 'account_id' },
];

const PlaylistsObj = { id: 'playlist_id', order: ['playlist_id', 'title', 'cover', 'createdAt', 'private', 'account_id'] }
const SongHeadCells = [
    { id: 'song_id', numeric: false, disablePadding: true, label: 'song_id' },
    { id: 'album_id', numeric: false, disablePadding: true, label: 'album_id' },
    { id: 'title', numeric: false, disablePadding: true, label: 'title' },
    { id: 'cover', numeric: false, disablePadding: true, label: 'cover' },
    { id: 'source', numeric: false, disablePadding: false, label: 'source' },
    { id: 'releaseDate', numeric: false, disablePadding: false, label: 'releaseDate' },
    { id: 'lyrics', numeric: false, disablePadding: false, label: 'lyrics' },
    { id: 'duration', numeric: true, disablePadding: false, label: 'duration' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'createdAt' },
    { id: 'premium', numeric: true, disablePadding: false, label: 'premium' },
    { id: 'label', numeric: false, disablePadding: false, label: 'label' },
];

const SongsObj = { id: 'song_id', order: ['song_id', 'album_id', 'title', 'cover', 'source', 'releaseDate', 'lyrics', 'duration', 'createdAt', 'premium', 'label'] }

const AccountHeadCells = [
    { id: 'account_id', numeric: false, disablePadding: true, label: 'account_id' },
    { id: 'email', numeric: false, disablePadding: true, label: 'email' },
    { id: 'password', numeric: false, disablePadding: false, label: 'password' },
    { id: 'firstName', numeric: false, disablePadding: true, label: 'firstName' },
    { id: 'lastName', numeric: false, disablePadding: true, label: 'lastName' },
    { id: 'role', numeric: true, disablePadding: false, label: 'role' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'createdAt' },
    { id: 'avatar', numeric: false, disablePadding: false, label: 'avatar' },
    { id: 'expiredDate', numeric: false, disablePadding: false, label: 'expiredDate' },
];
const AccountsObj = { id: 'account_id', order: ['account_id', 'email', 'password', 'firstName', 'lastName', 'role', 'createdAt', 'avatar', 'expiredDate'] }

//todo : songs, accounts
export default {
    AlbumsObj,
    PlaylistsObj,
    AlbumHeadCells,
    PlaylistHeadCells,
    SongHeadCells,
    SongsObj,
    AccountHeadCells,
    AccountsObj
}