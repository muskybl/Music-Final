// export const HOST = 'http://192.168.1.111:8080'
export const HOST = 'http://localhost:8080'


export const PICTURE = {
    ALBUM: 'album.jpg',
    ARTIST: 'artist.jpg',
    ACCOUNT: 'account.jpg',
    SONG: 'song.jpg',
    PLAYLIST: 'playlist.jpg',

}

export const DESCRIPTION = {
    ARTIST: 'The artist description is empty',
    ALBUM: 'The album description is empty',
    PLAYLIST: 'The playlist description is empty'
}

export const TITLE = {
    ALBUM: 'Single album',
    PLAYLIST: 'Single playlist'
}

export const TABLE = {
    ACCOUNT: 'account',
    ALBUM: 'album',
    ARTIST: 'artist',
    FAVORITE_ALBUM: 'favorite_album',
    FAVORITE_PLAYLIST: 'favorite_playlist',
    FAVORITE_SONG: 'favorite_song',
    GENRE: 'genre',
    PLAYLIST: 'playlist',
    SONG_GENRE_MAPPING: 'song_genre_mapping',
    SONG_ARTIST_MAPPING: 'song_artist_mapping',
    SONG_PLAYLIST_MAPPING: 'song_playlist_mapping',
    SONG: 'song',
    ACCOUNT_ACTIVITY: 'account_activity'
}

export const BY = {
    SONG_ID: 'song_id = ?',
    ALBUM_ID: 'album_id = ?',
    ARTIST_ID: 'artist_id = ?',
    GENRE_ID: 'genre_id = ?'
}

export const FIELD = {
    SONG_ID: 'song_id',
    ALBUM_ID: 'album_id',
    ARTIST_ID: 'artist_id',
    GENRE_ID: 'genre_id'
}

export const ROUTER = {
    ACCOUNT: 'accounts',
    ALBUM: 'albums',
    ARTIST: 'artists',
    SONG_ARTIST_MAPPING: 'songs-artists',
    FAVORITE_ALBUMS: 'favorite-albums',
    FAVORITE_PLAYLISTS: 'favorite-playlists',
    FAVORITE_SONGS: 'favorite-songs',
    GENRE: 'genres',
    SONG_GENRE_MAPPING: 'songs-genres',
    PLAYLIST: 'playlists',
    SONG_PLAYLIST_MAPPING: 'songs-playlists',
    SONG: 'songs',
    HOME: {
        TRENDING: 'trending',
        HOT_ALBUMS: 'hot-albums',
        SUGGEST_SEARCH: 'suggest-search',
        SEARCH: 'search',
        NEWEST:'newest'
    }
}

export const FOLDER = {
    IMAGES: HOST + '/images/',
    SONGS: HOST + '/songs/'
}
export const MESSAGE = {
    DELETE_OK: 'Delete successfully',
    DELETE_FAIL: 'Delete failed',
    CREATE_OK: 'Your have successfully created',
    CREATE_FAIL: 'Create failed',
    ADD_OK: 'Your have successfully added',
    ADD_FAIL: 'Add failed',
    REMOVE_OK: 'Your have successfully removed',
    REMOVE_FAIL: 'Remove failed',
    INVALID_EMAIL: 'The email is invalid or exists',
    INVALID_PASSWORD: 'Password must be not empty and longger than 7 characters',
    FAIL_LOGIN: 'The email or password is invalid!',
    SUCCESS_LOGIN: 'Login success',
    INVALID_INPUTS: 'Invalid inputs. Please check your input again!',
    INVALID_NAME: 'Contains invalid characters',
    REGISTER_OK: 'Congratulations, your account has been successfully created.',



}
export const LYRICS = 'LYRICS'
export const DATE_FORMAT = 'YYYY-MM-DD'

export const GET_SONGID = `SELECT song_id from ${TABLE.SONG} where `

export const MYSQL_PROC = {
    
    GET_EXPIRED_DATE : 'SELECT expiredDate FROM account WHERE account_id = ?',
    ORDER_PAID : 'UPDATE account SET expiredDate = ? WHERE account_id = ?',
    DELETE_PLAYLIST: 'DELETE FROM playlist WHERE playlist_id = ?',
    DELETE_ALBUM: 'DELETE FROM album WHERE album_id = ?',
    GET_ALL_PLAYLISTS: 'SELECT * FROM playlist',
    GET_ALL_ALBUMS: 'SELECT * FROM album',
    GET_ALL_SONGS: 'SELECT * FROM song',
    GET_ALL_ACCOUNTS : 'SELECT * FROM account',
    GET_GENRES_BY_SONGID: 'CALL GetGenresBySongId (?)',
    GET_ARTISTS_BY_SONGID: 'CALL GetArtistsBySongId (?)',
    GET_SONGS_BY_ALBUMID: 'CALL GetSongsByAlbumId (?)',
    GET_SONGS_BY_PLAYLISTID: 'CALL GetSongsByPlaylistId (?)',
    GET_SONGS_BY_ARTISTID: 'CALL GetSongsByArtistId (?)',
    GET_TRENDING: `SELECT * FROM song LIMIT 5`,
    GET_ALBUM_BY_ALBUMID: 'CALL GetAlbumByAlbumId (?)',
    GET_ALBUMS_BY_ARTISTID: 'CALL GetAlbumsByArtistId (?)',
    IS_FAV_ALBUM: 'CALL IsFavAlbum (?,?)',
    SIGN_IN: 'CALL SignIn (?)',
    SIGN_UP: 'CALL SignUp (?,?,?,?,?,?,?,?,?)',
    GET_HASH_PASSWORD: 'CALL GetHashPassword (?)',
    GET_ACCOUNT_BY_TOKEN: 'CALL GetAccountByToken (?,?)',
    GET_FAV_ALBUMS: 'CALL GetFavoriteAlbums (?)',
    GET_FAV_PLAYLISTS: 'CALL GetFavoritePlaylists (?)',
    GET_FAV_SONGS: 'CALL GetFavoriteSongs (?)',
    DELETE_FAV_ALBUM: 'CALL DeleteFavAlbum (?,?)',
    DELETE_FAV_PLAYLIST: 'CALL DeleteFavPlaylist (?,?)',
    DELETE_FAV_SONG: 'CALL DeleteFavSong (?,?)',

    GET_SONG_BY_ID: 'CALL GetSongBySongId (?)',
    GET_PLAYLIST_BY_ID: 'CALL GetPlaylistByPlaylistId (?)',
    GET_PLAYLISTS_BY_ARTISTID: 'CALL GetPlaylistsByArtistId (?)',
    GET_RANDOM_SONGS: `SELECT * FROM song ORDER BY rand() LIMIT ?;`,
    GET_RANDOM_ALBUMS: `SELECT * FROM album ORDER BY rand() LIMIT 5;`,
    GET_RANDOM_PLAYLISTS: `SELECT * FROM playlist ORDER BY rand() LIMIT ?`,
    GET_RANDOM_ARTISTS: `SELECT * FROM artist ORDER BY rand() LIMIT ? `,
    GET_PLAYLISTS: `SELECT playlist_id FROM playlist`,
    INSERT_SONG_PLAYLIST: `INSERT INTO song_playlist_mapping values(?,?)`,
    GET_USER_PLAYLISTS: `SELECT * FROM playlist WHERE account_id = (?)`,
    GET_SUGGEST_SEARCH: `CALL SuggestSearch ()`,
    GET_ARTIST_BY_ARTISTID: 'SELECT * FROM artist WHERE artist_id = (?)',
    DELETE_SONG_PL_MAPPING: 'DELETE FROM song_playlist_mapping WHERE song_id = (?) AND playlist_id = (?)',
    SEARCH_SONGS: 'SELECT * FROM song WHERE title LIKE ?',
    SEARCH_ALBUMS: 'SELECT * FROM album WHERE title LIKE ?',
    SEARCH_PLAYLISTS: 'SELECT * FROM playlist WHERE title LIKE ?',
    SEARCH_ARTISTS: 'SELECT * FROM artist WHERE fullName LIKE ?',
    GET_SONGS_GENRE: 'CALL GetSongsGenre (?)',
    GET_SONGS_BY_LABEL: 'SELECT * FROM song WHERE label = ? ORDER BY RAND() LIMIT ? ',

    SONGS_DATE_DESC : 'SELECT * FROM song ORDER BY releaseDate DESC LIMIT ? ',
    ALBUMS_DATE_DESC: 'SELECT * FROM album ORDER BY releaseDate DESC LIMIT ? ',
    PLAYLISTS_DATE_DESC : 'SELECT * FROM playlist ORDER BY createdAt DESC LIMIT ? ',
    CREATE_SONG : 'CALL createSong (?,?,?,?,?,?,?,?,?,?,?)'
}

