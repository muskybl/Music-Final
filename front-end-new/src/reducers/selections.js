import { ACTION, ACTION_PREFIX } from '../mylib/constant/constStr'
export const defaultSelections = {
    selected: {
        songs: [],
        parent: {
            id: '',
            type: '',
            info: {}
        },
    },
    selecting: {
        songs: [],
        parent: {
            id: '',
            type: '',
            info: {}
        },

    },
    playIndex: -1,
    isPlaying: false,
    audioInst: null
}

export const selectionsReducer = (state, action) => {
    switch (action.type) {
        case ACTION.SELECTING_SONGS: return {
            ...state,
            selecting: {
                songs: action.data,
                parent: action.parent === undefined ? state.selecting.parent : action.parent
            }
        }
        case ACTION.SELECTING_ALBUM:
            return {
                ...state,
                selecting: {
                    ...state.selecting,
                    parent: { ...action.data }
                }
            }
        case ACTION.SELECTING_PLAYLIST:
            return {
                ...state,
                selecting: {
                    ...state.selecting,
                    parent: { ...action.data }
                }
            }
        case ACTION.PLAY_INDEX:
            console.log('play index', action.index)
            return {
                ...state,
                playIndex: action.index
            }
        case ACTION.SET_PLAY:
            return {
                ...state,
                isPlaying: action.data
            }
        case ACTION.PLAY_SONGS:
            const temp = {
                songs: action.songs === undefined ? state.selecting.songs : action.songs,
                parent: action.parent === undefined ? state.selecting.parent : action.parent
            }
            console.log('PS', action.index)
            return {
                ...state,
                selected: { ...temp },
                selecting: { ...temp },
                playIndex: action.index,
                isPlaying: true
            }
        case ACTION.GET_AUDIO_INSTANCE: return {
            ...state,
            audioInst: action.data
        }
        case ACTION_PREFIX.DELETE_ + ACTION.SONG_PLAYLIST: return {
            ...state,
            selecting: {
                ...state.selecting,
                songs: state.selecting.songs.filter(s => s.song_id !== action.data)
            }
        }

        default: return state
    }
}

// TODO : refactor all selecting and selected