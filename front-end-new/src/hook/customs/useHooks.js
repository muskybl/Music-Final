import { useState, useEffect, useContext } from 'react'
import { ACTION_PREFIX, ACTION, TYPE_ACTION } from '../../mylib/constant/constStr'
import * as accAction from '../../actions/account'
import AppContext from '../../context/app-context'

// import _ from 'lodash'
/**
 * @function useFavStatus
 * @param {String} type 'album' || 'song' || 'playlist'
 * @param {String} action 'FAV_ALBUM' || 'FAV_PLAY_LIST' || 'FAV_SONG'
 * @param {Object} data The data object
 * @param {String} id The id string of data
 * @param {Function} dispatch The dispatch function
 * @param {Boolean} isFavorite true || false
 * @returns {void}
 */
export const useFavStatus = (type, data, id, dispatch, isFavorite) => {
    const [isFav, setisFav] = useState(isFavorite)
    const [shouldUpdate, setshouldUpdate] = useState(false)
    
    useEffect(() => {
        if (shouldUpdate) {            
            isFav ?
                dispatch({ type: ACTION_PREFIX.ADD_ + TYPE_ACTION[type], data }) :
                dispatch({ type: ACTION_PREFIX.DELETE_ + TYPE_ACTION[type], data: id })
            
            switch (type) {
                case 'album':
                    isFav ? accAction.addFavAlbum(id) : accAction.deleteFavAlbum(id)
                    break
                case 'song':
                    isFav ? accAction.addFavSong(id) : accAction.deleteFavSong(id)
                    break
                case 'playlist':
                    isFav ? accAction.addFavPlaylist(id) : accAction.deleteFavPlaylist(id)
                    break
                default: return
            }
        }
    }, [isFav])

    return [isFav, setisFav, setshouldUpdate]
}
export const useProgress = (isLoading = true) => {
    const [loading, setLoading] = useState(isLoading)
    useEffect(() => {

        loading ?
            document.getElementById('progress').style.display = 'block' :
            document.getElementById('progress').style.display = 'none'

    }, [loading])

    return setLoading
}

export const usePlay = (playId, parent) => {
    const { selections, dispatchSelect } = useContext(AppContext)
    const selectedId = selections.selected.parent.id
    const selectingId = selections.selecting.parent.id
    const audioInst = selections.audioInst

    const [playing, setPlay] = useState({ songs: [], isPlaying: playId === selectingId })
    // console.log('usePlay', playing.songs)

    const fetchSongs = (newSongs) => {
        setPlay({ songs: newSongs, isPlaying: true })
        dispatchSelect({ type: ACTION.PLAY_SONGS, songs: newSongs, parent, index: 0 })

        console.log('listen', playing)
        audioInst.togglePlay()
    }

    const play = () => {
        setPlay({ ...playing, isPlaying: true })
        const isEqual = selectedId === playId
        !isEqual && dispatchSelect({ type: ACTION.PLAY_SONGS, songs: playing.songs, parent, index: 0 })
        audioInst.togglePlay()

    }
    const pause = () => {
        setPlay({ ...playing, isPlaying: false })
        audioInst.togglePlay()
    }
    useEffect(() => {
        console.log(selectedId, playId)
        setPlay({ ...playing, isPlaying: selectedId === playId && selections.isPlaying })
    }, [selections])
    return {
        playing,
        fetchSongs,
        play,
        pause,
    }
}