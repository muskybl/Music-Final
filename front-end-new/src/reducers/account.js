import { ACTION, ACTION_PREFIX } from '../mylib/constant/constStr'
import _ from 'lodash'
export const defaultAccount = {
    profile: {
        email: '',
        premium: false
    },
    favAlbums: [],
    favPlaylists: [],
    favSongs: [],
    userPlaylists: []
}
export const accountReducer = (state, action) => {
    switch (action.type) {
        case ACTION.SIGN_IN: return action.data
        case ACTION.SIGN_OUT: return defaultAccount
        case ACTION.SIGN_UP: return action.data
        case ACTION.SIGN_IN_BY_TOKEN: return action.data
        case ACTION_PREFIX.ADD_ + ACTION.FAV_ALBUMS: {
            !_.isObject(_.find(state.favAlbums, action.data)) && state.favAlbums.push(action.data)
            return {
                ...state,
                favAlbums: state.favAlbums
            }

        }
        case ACTION_PREFIX.ADD_ + ACTION.FAV_PLAYLISTS: {
            !_.isObject(_.find(state.favPlaylists, action.data)) && state.favPlaylists.push(action.data)
            return {
                ...state,
                favPlaylists: state.favPlaylists
            }
        }
        case ACTION_PREFIX.DELETE_ + ACTION.FAV_ALBUMS:
            return {
                ...state,
                favAlbums: state.favAlbums.filter(al => al.album_id !== action.data)
            }
        case ACTION_PREFIX.ADD_ + ACTION.FAV_SONGS: {
            !_.isObject(_.find(state.favSongs, action.data)) && state.favSongs.push(action.data)
            return {
                ...state,
                favSongs: state.favSongs
            }
        }
        case ACTION_PREFIX.DELETE_ + ACTION.FAV_SONGS: return {
            ...state,
            favSongs: state.favSongs.filter(song => song.song_id !== action.data)
        }
        case ACTION_PREFIX.DELETE_ + ACTION.FAV_PLAYLISTS: return {
            ...state,
            favPlaylists: state.favPlaylists.filter(pl => pl.playlist_id !== action.data),
            userPlaylists: state.userPlaylists.filter(pl => pl.playlist_id !== action.data)
        }

        case ACTION_PREFIX.ADD_ + ACTION.USER_PLAYLISTS:
            !_.isObject(_.find(state.userPlaylists, action.data)) && state.userPlaylists.push(action.data)
            return {
                ...state,
                userPlaylists: state.userPlaylists
            }
        case ACTION.UPDATE_EXPIRED_DATE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    expiredDate: action.data
                }
            }
        default: return state
    }
}
