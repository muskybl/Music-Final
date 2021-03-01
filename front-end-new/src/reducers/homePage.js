import { ACTION } from '../mylib/constant/constStr'
export const defaultHomePageState = {
    darkMode: true,
    heroSlides: [],
    albumsAlltime: [],
    albumsWeekly: [],
    playlistsAlltime: [],
    playlistsWeekly: [],
    songsAlltime: [],
    songsWeekly: [],
}
export const homePageReducer = (state, action) => {
    switch (action.type) {
        case ACTION.LOAD_HOME_PAGE:
            return {
                ...state,
                ...action.data
            }
        case ACTION.LOAD_HERO_SLIDES:
            return {
                ...state,
                heroSlides: action.data
            }
        case ACTION.LOAD_TRENDING:
            return {
                ...state,
                trending: action.data
            }
        case ACTION.LOAD_TOP_CHARTS:
            return {
                ...state,
                topCharts: action.data
            }
        case ACTION.LOAD_TOP_100:
            return {
                ...state,
                top100: action.data
            }
        case ACTION.LOAD_NEWEST_RELEASE:
            return {
                ...state,
                newestRelease: action.data
            }
        case ACTION.LOAD_HOT_ALBUMS:
            return {
                ...state,
                hotAlbums: action.data
            }
        case ACTION.LOAD_HOT_PLAYLISTS:
            return {
                ...state,
                hotPlaylists: action.data
            }

        case ACTION.CHANGE_THEME:
            return {
                ...state,
                darkMode: !state.darkMode
            }
        case ACTION.AUTO_PLAY:
            return {
                ...state,
                selectingItems: {
                    ...state.selectingItems,
                    autoPlay: action.data
                }
            }
        default:
            return state
    }
}
