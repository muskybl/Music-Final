export const ACTION = {
    UPDATE_EXPIRED_DATE: 'UPDATE_EXPIRED_DATE',
    LOAD_HERO_SLIDES: 'LOAD_HERO_SLIDES',
    LOAD_TRENDING: 'LOAD_TRENDING',
    LOAD_TOP_CHARTS: 'LOAD_TOP_CHARTS',
    LOAD_TOP_100: 'LOAD_TOP_100',
    LOAD_HOT_ALBUMS: 'LOAD_HOT_ALBUMS',
    LOAD_HOT_PLAYLISTS: 'LOAD_HOT_PLAYLISTS',
    LOAD_NEWEST_RELEASE: 'LOAD_NEWEST_RELEASE',
    LOAD_HOME_PAGE: 'LOAD_HOME_PAGE',
    SELECTING_ALBUM: 'SELECTING_ALBUM',
    SELECTING_PLAYLIST: 'SELECTING_PLAYLIST',
    SELECTING_SONGS: 'SELECTING_SONGS',
    PREVIEW_SONGS: 'PREVIEW_SONGS',
    CHANGE_THEME: 'CHANGE_THEME',
    PLAY_INDEX: 'PLAY_INDEX',
    AUTO_PLAY: 'PLAY_INDEX',
    SIGN_IN: 'SIGN_IN',
    SIGN_OUT: 'SIGN_OUT',
    SIGN_UP: 'SIGN_UP',
    SIGN_IN_BY_TOKEN: 'SIGN_IN_BY_TOKEN',
    LOAD_FAV_ALBUMS: 'LOAD_FAV_ALBUMS',
    LOAD_FAV_SONGS: 'LOAD_FAV_SONGS',
    LOAD_FAV_PLAYLISTS: 'LOAD_FAV_PLAYLISTS',
    FAV_ALBUMS: 'FAV_ALBUMS',
    FAV_PLAYLISTS: 'FAV_PLAYLISTS',
    FAV_SONGS: 'FAV_SONGS',
    LOADING: 'LOADING',
    MESSAGE: 'MESSAGE',
    IS_LOGIN: 'IS_LOGIN',
    SET_PLAY: 'SET_PLAY',
    PLAY_SONGS: 'PLAY_SONGS',
    GET_AUDIO_INSTANCE: 'GET_AUDIO_INSTANCE',
    SONG_PLAYLIST: 'SONG_PLAYLIST',
    USER_PLAYLISTS: 'USER_PLAYLISTS',
    SET_SNACK: 'SET_SNACK',
    DISABLE_SNACK: 'DISABLE_SNACK'
}
export const ACTION_PREFIX = {
    ADD_: 'ADD_',
    DELETE_: 'DELETE_',
}

export const MESSAGE = {
    INVALID_EMAIL: 'The email is invalid',
    INVALID_PASSWORD: 'Password must be not empty and longger than 7 characters',
    FAIL_LOGIN: 'The email or password is invalid!',
    SUCCESS_LOGIN: 'Login success',
    INVALID_INPUTS: 'Invalid inputs. Please check your input again!',
    INVALID_NAME: 'Contains invalid characters',

    //albums
    MOST_VIEWS_ALBUMS: 'Most viewed Albums',
    TRENDING_WEEKLY_ALBUMS: 'Trending',

    //playlists
    POPULAR_PLAYLISTS: 'Recently Popular',
    JUST_FOR_YOU: 'Just for you',
    CREATE_PL_OK: 'Create playlist success!',
    CREATE_PL_FAIL: 'Create playlist failed!',
    ADD_SONG_TO_PL_OK: 'Add to playlist success!',
    ADD_SONG_TO_PL_FAIL: 'Add to playlist failed!',

    //songs




}
export const HOST_ADDRESS = 'http://localhost:8080'
export const ACCOUNT = 'accounts'
export const PERIODICITY = {
    ALLTIME: 'alltime',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly'
}
export const ROUTER = {
    NEWEST: 'newest',
    CREATE_ORDER: 'payment/createOrder',
    ORDER_PAID: 'payment/orderPaid',
    SEARCH: 'search',
    ACCOUNTS: 'accounts',
    SUGGEST_SEARCH: 'suggest-search',
    HERO_SLIDES: 'heroslides',
    ALBUMS_ALLTIME: `albums/${PERIODICITY.ALLTIME}`,
    PLAYLISTS_ALLTIME: `playlists/${PERIODICITY.ALLTIME}`,
    SONGS_ALLTIME: `songs/${PERIODICITY.ALLTIME}`,
    SONG_PLAYLIST_MAPPING: 'songs-playlists',
    ALBUMS_WEEKLY: `albums/${PERIODICITY.WEEKLY}`,
    PLAYLISTS_WEEKLY: `playlists/${PERIODICITY.WEEKLY}`,
    SONGS_WEEKLY: `songs/${PERIODICITY.WEEKLY}`,
    RANDOM_ALBUMS: `albums/random/5`,
    NEWEST_RELEASE: 'newest-release',
    ALBUMS: 'albums',
    SONGS: 'songs',
    PLAYLISTS: 'playlists',
    ARTISTS: 'artists',
    GENRES: 'genres',
    SIGN_IN: 'signIn',
    SIGN_OUT: 'signOut',
    SIGN_UP: 'signUp',
    ME: 'me',
    FAV_ALBUMS: 'favorite-albums',
    FAV_PLAYLISTS: 'favorite-playlists',
    FAV_SONGS: 'favorite-songs',
    LISTEN: 'listen'
}

export const QUERY = {
    GET_SONGS_BY_ALBUMID: `${ROUTER.ALBUMS}/%s/${ROUTER.SONGS}`,
    GET_ARTISTS_BY_ALBUMID: `${ROUTER.ALBUMS}/%s/${ROUTER.ARTISTS}`,
    GET_ALBUM_BY_ALBUMID: `${ROUTER.ALBUMS}/%s`,
    GET_ARTISTS_BY_SONGID: `${ROUTER.SONGS}/%s/${ROUTER.ARTISTS}`,
    GET_GENRES_BY_SONGID: `${ROUTER.SONGS}/%s/${ROUTER.GENRES}`,
    GET_PLAYLIST_BY_PLID: `${ROUTER.PLAYLISTS}/%s`,
    GET_SONGS_BY_PLID: `${ROUTER.PLAYLISTS}/%s/${ROUTER.SONGS}`,
    GET_ARTIST_INFO: `${ROUTER.ARTISTS}/%s`
}

export const ACCOUNT_ROUTER = `${HOST_ADDRESS}/${ACCOUNT}/${ROUTER.ME}`

export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}
export const TYPE_ACTION = {
    'album': ACTION.FAV_ALBUMS,
    'playlist': ACTION.FAV_PLAYLISTS,
    'song': ACTION.FAV_SONGS,
}

export const GENRES = [
    'Country',
    'Dance',
    'Hip-Hop',
    'Latin Music',
    'Pop',
    'R&B',
    'Rap',
    'Soul',
    'Alternative'
]